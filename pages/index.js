import React from 'react';
import Head from 'next/head';

import { connect } from 'react-redux';
import actions from '../src/actions';

import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/LIstItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";

import Icon from "@mdi/react";
import { mdiMenu, mdiAccount, mdiInformation, mdiLogin } from "@mdi/js";

import PageStep1 from "../components/pages/step1";
import PageStep2 from "../components/pages/step2";
import PageStep3 from "../components/pages/step3";

import PopupMessage from "../components/dialogs/popupMessageDialog";
import AboutDialog from "../components/dialogs/aboutDialog";
import LoginDialog from "../components/dialogs/loginDialog";

export default connect(state => state, dispatch => ({
  selectGrade: id => dispatch(actions.step1.selectGrade(id)),
  selectClass: id => dispatch(actions.step1.selectClass(id)),
  openWarnNoGradeOrClassDialog: () => dispatch(actions.step1.setWarnNoGradeOrClassDialog(true)),
  closeWarnNoGradeOrClassDialog: () => dispatch(actions.step1.setWarnNoGradeOrClassDialog(false)),

  openLoginDialog: () => dispatch(actions.openLoginDialog()),
  closeLoginDialog: () => dispatch(actions.closeLoginDialog()),
  submitAndCloseLoginDialog: (name, password) => dispatch(actions.submitAndCloseLoginDialog(name, password)),

  openAddMemberDialog: () => dispatch(actions.step2.openAddMemberDialog()),
  closeAddMemberDialog: () => dispatch(actions.step2.closeAddMemberDialog()),
  submitAndCloseDialog: (name, sex, reason) => dispatch(actions.step2.submitAndCloseDialog(name, sex, reason)),
  deleteMember: id => dispatch(actions.step2.deleteMember(id)),

  submitList: () => dispatch(actions.step3.submitList()),

  increaseStep: () => dispatch(actions.increaseStep()),
  decreaseStep: () => dispatch(actions.decreaseStep()),
  backToHeadStep: () => dispatch(actions.backToHeadStep()),

  openDrawer: () => dispatch(actions.openDrawer()),
  closeDrawer: () => dispatch(actions.closeDrawer()),

  openAboutDialog: () => dispatch(actions.openAboutDialog()),
  closeAboutDialog: () => dispatch(actions.closeAboutDialog())
}))(props => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  const classes = makeStyles(theme => ({
    drawerList: {
      width: 240
    },
    divider: {
      marginTop: 10,
      marginBottom: 10
    },
    center: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    },
    centerRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row"
    },
    fillWidth: {
      width: "80%"
    },
    formControl: {
      width: 100
    },
    margin: {
      margin: 10
    }
  }))();

  return ([
    <Head>
      <title>晨检上报系统</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>,
    <div className={classnames(classes.center)}>
      <LoginDialog open={props.loginDialogOpen} onClose={props.closeLoginDialog} />
      <AboutDialog open={props.aboutDialogOpen} onClose={props.closeAboutDialog} />
      <Drawer
        anchor="left"
        open={props.drawerOpen}
        onClose={props.closeDrawer}
      >
        <List className={classes.drawerList}>
          <CardHeader
            avatar={
              <Icon path={mdiAccount} size={1} />
            }
            title="公共模式"
            subheader="当前无管理权限"
          />
          <Divider className={classes.divider} />
          <ListItem button onClick={props.openLoginDialog}>
            <ListItemIcon>
              <Icon path={mdiLogin} size={1} />
            </ListItemIcon>
            <ListItemText primary={"管理员登录"} />
          </ListItem>
          <ListItem button onClick={props.openAboutDialog}>
            <ListItemIcon>
              <Icon path={mdiInformation} size={1} />
            </ListItemIcon>
            <ListItemText primary={"关于"} />
          </ListItem>
        </List>
      </Drawer>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={props.openDrawer}>
            <Icon path={mdiMenu} size={1} color="white" />
          </IconButton>
          <Typography variant="h6" className={classes.margin}>
            晨检上报系统
          </Typography>
        </Toolbar>
      </AppBar>
      <Stepper activeStep={props.activeStep} alternativeLabel>
        {["选择上报班级", "填写上报情况", "提交结果"].map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={classnames(classes.fillWidth, classes.center)}>
        <PopupMessage
          open={props.warnNoGradeOrClassDialogOpen}
          onClose={props.closeWarnNoGradeOrClassDialog}
          text="请选择完整的班级！"
        />
        {props.activeStep === 0 && <PageStep1 {...props} />}
        {props.activeStep === 1 && <PageStep2 {...props} />}
        {props.activeStep === 2 && <PageStep3 {...props} />}
        {props.activeStep !== 2 && (
          <div className={classes.centerRow}>
            <Button
              disabled={props.activeStep === 0}
              onClick={() =>
                props.decreaseStep()
              }
              className={classes.margin}
            >
              上一步
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (props.activeStep === 0) {
                  if (!(props.classId && props.grade)) {
                    props.openWarnNoGradeOrClassDialog();
                    return;
                  }
                }
                else if (props.activeStep === 1) props.submitList();
                props.increaseStep();
              }}
              className={classes.margin}
            >
              下一步
            </Button>
          </div>
        )}
        {props.activeStep === 2 && props.submitState !== "done" && (
          <Button className={classes.margin} onClick={props.backToHeadStep}>
            返回至开始位置
          </Button>
        )}
      </div>
    </div>
  ]);
});

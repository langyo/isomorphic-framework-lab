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

import AboutDialog from "../components/dialogs/aboutDialog";
import LoginDialog from "../components/dialogs/loginDialog";

export default connect(state => ({ state }), dispatch => ({
  dispatcher: {
    views: {
      increaseStep: () => dispatch(actions.increaseStep()),
      decreaseStep: () => dispatch(actions.decreaseStep()),
      backToHeadStep: () => dispatch(actions.backToHeadStep()),

      openDrawer: () => dispatch(actions.openDrawer()),
      closeDrawer: () => dispatch(actions.closeDrawer()),

      openLoginDialog: () => dispatch(actions.openLoginDialog()),
      closeLoginDialog: () => dispatch(actions.closeLoginDialog()),
      submitAndCloseLoginDialog: (name, password) => dispatch(actions.submitAndCloseLoginDialog(name, password)),

      openAboutDialog: () => dispatch(actions.openAboutDialog()),
      closeAboutDialog: () => dispatch(actions.closeAboutDialog())
    },

    pages: {
      step1: {
        selectGrade: id => dispatch(actions.step1.selectGrade(id)),
        selectClass: id => dispatch(actions.step1.selectClass(id)),
        openWarnNoGradeOrClassDialog: () => dispatch(actions.step1.setWarnNoGradeOrClassDialog(true)),
        closeWarnNoGradeOrClassDialog: () => dispatch(actions.step1.setWarnNoGradeOrClassDialog(false)),
      },
      step2: {
        openAddMemberDialog: () => dispatch(actions.step2.openAddMemberDialog()),
        closeAddMemberDialog: () => dispatch(actions.step2.closeAddMemberDialog()),
        submitAndCloseDialog: (name, sex, reason) => dispatch(actions.step2.submitAndCloseDialog(name, sex, reason)),
        deleteMember: id => dispatch(actions.step2.deleteMember(id)),
        submitList: () => dispatch(actions.step3.submitList())
      },
      step3: {
      }
    }
  }
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
      <LoginDialog open={props.state.views.loginDialogOpen} onClose={props.dispatcher.views.closeLoginDialog} />
      <AboutDialog open={props.state.views.aboutDialogOpen} onClose={props.dispatcher.views.closeAboutDialog} />
      <Drawer
        anchor="left"
        open={props.state.views.drawerOpen}
        onClose={props.dispatcher.views.closeDrawer}
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
          <ListItem button onClick={props.dispatcher.views.openLoginDialog}>
            <ListItemIcon>
              <Icon path={mdiLogin} size={1} />
            </ListItemIcon>
            <ListItemText primary={"管理员登录"} />
          </ListItem>
          <ListItem button onClick={props.dispatcher.views.openAboutDialog}>
            <ListItemIcon>
              <Icon path={mdiInformation} size={1} />
            </ListItemIcon>
            <ListItemText primary={"关于"} />
          </ListItem>
        </List>
      </Drawer>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={props.dispatcher.views.openDrawer}>
            <Icon path={mdiMenu} size={1} color="white" />
          </IconButton>
          <Typography variant="h6" className={classes.margin}>
            晨检上报系统
          </Typography>
        </Toolbar>
      </AppBar>
      <Stepper activeStep={props.state.views.activeStep} alternativeLabel>
        {["选择上报班级", "填写上报情况", "提交结果"].map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={classnames(classes.fillWidth, classes.center)}>
        {props.state.views.activeStep === 0 && <PageStep1
          {...props.state.pages.step1}
          {...props.state.views}
          {...props.state.data}
          {...props.dispatcher.pages.step1}
          {...props.dispatcher.views}
          {...props.dispatcher.data}
        />}
        {props.state.views.activeStep === 1 && <PageStep2
          {...props.state.pages.step2}
          {...props.state.views}
          {...props.state.data}
          {...props.dispatcher.pages.step2}
          {...props.dispatcher.views}
          {...props.dispatcher.data}
        />}
        {props.state.views.activeStep === 2 && <PageStep3
          {...props.state.pages.step3}
          {...props.state.views}
          {...props.state.data}
          {...props.dispatcher.pages.step3}
          {...props.dispatcher.views}
          {...props.dispatcher.data}
        />}
      </div>
    </div>
  ]);
});

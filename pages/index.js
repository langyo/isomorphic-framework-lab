import React from 'react';
import Head from 'next/head';

import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";

import MemberTable from "../components/memberTable";

export default function () {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  const classes = makeStyles(theme => ({
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
    },
    footMessage: {
      position: "absolute",
      bottom: 0,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }))();

  const [activeStep, setActiveStep] = React.useState(0);
  const [grade, setGrade] = React.useState("");
  const [classId, setClass] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [studentList, setStudentList] = React.useState([]);
  const addMember = (name, sex, reason) => {
    let n = studentList;
    n.push({
      name, sex, reason
    });
    setStudentList(n);
    setDialogOpen(false);
  };
  const removeMember = id => {
    let n = Array.prototype.slice.call(studentList);
    n.splice(id, 1);
    setStudentList(n);
  }

  return ([
    <Head>
      <title>晨检上报系统</title>
      <link rel='icon' href='/favicon.ico' />
      <style>{`
        body{
          margin: 0px;
          padding: 0px;
        }
      `}</style>
    </Head>,
    <div className={classnames(classes.center)}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.margin}>
            晨检上报系统
          </Typography>
        </Toolbar>
      </AppBar>
      <Stepper activeStep={activeStep} alternativeLabel>
        {["选择上报班级", "填写上报情况", "提交结果"].map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={classnames(classes.fillWidth, classes.center)}>
        {activeStep === 0 && (
          <Paper
            className={classnames(
              classes.centerRow,
              classes.fillWidth,
              classes.card
            )}
          >
            <FormControl
              className={classnames(classes.formControl, classes.margin)}
            >
              <InputLabel>年级</InputLabel>
              <Select value={grade} onChange={e => setGrade(e.target.value)}>
                <MenuItem value={1}>高一</MenuItem>
                <MenuItem value={2}>高二</MenuItem>
                <MenuItem value={3}>高三</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              className={classnames(classes.formControl, classes.margin)}
            >
              <InputLabel>班级</InputLabel>
              <Select value={classId} onChange={e => setClass(e.target.value)}>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        )}
        {activeStep === 1 && (
          <MemberTable 
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            addMember={addMember}
            removeMember={removeMember}
            studentList={studentList}
          />
        )}
        {activeStep === 2 && (
          <Paper
            className={classnames(
              classes.center,
              classes.fillWidth,
              classes.card
            )}
          >
            <Typography className={classes.margin} variant="body2">
              正在提交
            </Typography>
            <CircularProgress className={classes.margin} />
          </Paper>
        )}
        {activeStep !== 2 && (
          <div className={classes.centerRow}>
            <Button
              disabled={activeStep === 0}
              onClick={() =>
                setActiveStep(prevActiveStep => prevActiveStep - 1)
              }
              className={classes.margin}
            >
              上一步
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                setActiveStep(prevActiveStep => prevActiveStep + 1)
              }
              className={classes.margin}
            >
              下一步
            </Button>
          </div>
        )}
        {activeStep === 2 && (
          <Button className={classes.margin} onClick={() => setActiveStep(0)}>
            返回至开始位置
          </Button>
        )}
      </div>
      <Typography variant="body2" className={classes.footMessage}>
        Powered By <a href="https://github.com/langyo">langyo</a>, All Right
        Reserved
      </Typography>
    </div>
  ]);
}

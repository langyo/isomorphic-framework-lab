import React from 'react';
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

export default props => {
  const classes = makeStyles(theme => ({
    marginTop: {
      position: 'absolute',
      top: 60,
      width: '100%'
    }
  }))();

  return [<Stepper activeStep={props.step} alternativeLabel className={classes.marginTop}>
    {["选择上报班级", "填写上报情况", "提交结果"].map(label => (
      <Step key={label}>
        <StepLabel>{label}</StepLabel>
      </Step>
    ))}
  </Stepper>];
}
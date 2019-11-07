import React from 'react';
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

export default props => {
  return [<Stepper activeStep={props.state.views.activeStep} alternativeLabel>
    {["选择上报班级", "填写上报情况", "提交结果"].map(label => (
      <Step key={label}>
        <StepLabel>{label}</StepLabel>
      </Step>
    ))}
  </Stepper>, <>{props.child}</>];
}
import React from "react";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";

export default props => {
  const classes = makeStyles(theme => ({
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

  return <Paper
    className={classnames(
      classes.centerRow,
      classes.fillWidth
    )}
  >
    <FormControl
      className={classnames(classes.formControl, classes.margin)}
    >
      <InputLabel>年级</InputLabel>
      <Select value={props.grade} onChange={e => props.selectGrade(e.target.value)}>
        <MenuItem value={1}>高一</MenuItem>
        <MenuItem value={2}>高二</MenuItem>
        <MenuItem value={3}>高三</MenuItem>
      </Select>
    </FormControl>
    <FormControl
      className={classnames(classes.formControl, classes.margin)}
    >
      <InputLabel>班级</InputLabel>
      <Select value={props.classId} onChange={e => props.selectClass(e.target.value)}>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
      </Select>
    </FormControl>
  </Paper>
}
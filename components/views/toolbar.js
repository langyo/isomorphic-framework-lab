import React from 'react';
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";

export default props => {
  return [<AppBar position="static">
    <Toolbar>
      <IconButton onClick={props.dispatcher.views.openDrawer}>
        <Icon path={mdiMenu} size={1} color="white" />
      </IconButton>
      <Typography variant="h6" className={classes.margin}>
        晨检上报系统
      </Typography>
    </Toolbar>
  </AppBar>, <>{props.child}</>];
}
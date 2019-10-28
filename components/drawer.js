import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/LIstItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";

import Icon from "@mdi/react";
import { mdiAccount, mdiDotsHorizontal, mdiInformation, mdiLogin } from "@mdi/js";

export default props => {
  const classes = makeStyles(theme => ({
    list: {
      width: 240
    },
    divider: {
      marginTop: 10,
      marginBottom: 10
    }
  }))();

  return (<Drawer
    anchor="left"
    open={props.open}
    onClose={props.onClose}
  >
    <List className={classes.list}>
      <CardHeader
        avatar={
          <Icon path={mdiAccount} size={1} />
        }
        action={
          <IconButton>
            <Icon path={mdiDotsHorizontal} size={1} />
          </IconButton>
        }
        title="匿名模式"
        subheader="当前无管理权限"
      />
      <Divider className={classes.divider} />
      <ListItem button>
        <ListItemIcon>
          <Icon path={mdiLogin} size={1} />
        </ListItemIcon>
        <ListItemText primary={"管理员登录"} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Icon path={mdiInformation} size={1} />
        </ListItemIcon>
        <ListItemText primary={"关于"} />
      </ListItem>
    </List>
  </Drawer>)
}
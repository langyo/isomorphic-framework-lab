import React from 'react';

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Switch from "@material-ui/core/Switch";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

export default function(props) {
  const [name, setName] = React.useState("");
  const [sex, setSex] = React.useState("boy");

  return (
    <Dialog fullWidth open={props.open} onClose={props.onClose}>
      <DialogTitle>添加学生</DialogTitle>
      <DialogContent>
        <DialogContentText>
          请填写当天未到校学生的基本信息与请假理由，一次填写一个。
          </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="姓名"
          valuie={name}
          onChange={e => setName(e.target.value)}
        />
        <Divider />
        <FormLabel>性别</FormLabel>
        <FormGroup>
          <RadioGroup
            name="sex"
            value={sex}
            onChange={e => setSex(e.target.value)}
            row
          >
            <FormControlLabel value="boy" control={<Radio />} label="男" />
            <FormControlLabel value="girl" control={<Radio />} label="女" />
          </RadioGroup>
        </FormGroup>
        <Divider />
        <Grid container>
          <Grid item xs={12}>
            <FormLabel>请假理由</FormLabel>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={props.reasonMode}
                  onChange={props.onChangeReasonMode}
                />
              }
              label="自行填写"
            />
          </Grid>
          <Grid item xs={12}>
            {props.reasonMode === false && (
              <Select value={props.reason} onChange={props.onChangeReason}>
                <MenuItem value={1}>Ten</MenuItem>
                <MenuItem value={2}>Twenty</MenuItem>
                <MenuItem value={3}>Thirty</MenuItem>
              </Select>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          取消
          </Button>
        <Button onClick={props.onFinish} color="primary">
          添加
          </Button>
      </DialogActions>
    </Dialog>
  );
}
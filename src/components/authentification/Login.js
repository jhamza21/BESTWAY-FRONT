import React, { useState } from "react";
import {
  FormControl, TextField, Button, CircularProgress
  , FormGroup, Divider, IconButton, OutlinedInput, InputLabel, InputAdornment
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import useStyles from "../shared/material-ui-css";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../redux/users/userActions";
import "./style.css";
import history from "../../services/history";

export default function Login() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading)
  const classes = useStyles();
  const [data, setData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const register = () => history.push("/register");
  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  //SUBMIT USER LOGIN
  const submit = async (e) => {
    e.preventDefault();
    dispatch(signIn(data))
  };
  return (
    <div className="authPage">
      <div className="formContainer">
        <h4 className="formTitle">SIGN IN</h4>
        <Divider />
        <form onSubmit={submit}>
          <FormGroup row={true} className={classes.authForm}>
            <TextField
              className={classes.textField}
              required
              name="email"
              onChange={(e) => handleInput(e)}
              label="Email"
              variant="outlined" />
            <FormControl variant="outlined">
              <InputLabel className={classes.outlinedLabel} htmlFor="outlined-adornment-password">Password *</InputLabel>
              <OutlinedInput
                className={classes.outlined}
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={data.password || ''}
                required
                onChange={(e) => setData({ ...data, password: e.target.value })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(event) => event.preventDefault()}
                      edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>}
                labelWidth={90} />
            </FormControl>

            <Button
              disabled={isLoading}
              type="submit"
              variant="contained"
              className={classes.buttonSubmit}
              startIcon={isLoading && <CircularProgress color="secondary" size={20} />}>
              SIGN IN
      </Button>
            <div className="toggleForm" onClick={register}>
              Don't have an account ?
        </div>
          </FormGroup>
        </form>
      </div>
    </div>
  );
}

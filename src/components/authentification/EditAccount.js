import React, { useState } from "react";
//import { useHistory } from "react-router-dom";
import {
  FormControl, TextField, Button, CircularProgress
  , FormGroup, Divider, IconButton, OutlinedInput, InputLabel, InputAdornment, Avatar
} from '@material-ui/core';
import { Visibility, VisibilityOff, PhotoCamera } from '@material-ui/icons';
import useStyles from "../shared/material-ui-css"
import { useSelector, useDispatch } from "react-redux"
import "./style.css";
import { updateProfile } from "../../redux/users/userActions";

export default function EditAccount() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [changePassword, setChangePassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const user = useSelector((state) => state.user)
  const [data, setData] = useState(user.data);
  // const history = useHistory();

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData()
    for (var key in data) {
      formData.append(key, data[key]);
    }
    formData.append('image', file)
    dispatch(updateProfile(formData))
  };

  return (
    <div className="authPage">
      <div className="formContainer">
        <h4 className="formTitle">Profile</h4>
        <Divider />
        <form onSubmit={submit}>
          <FormGroup row={true} className={classes.authForm}>
            <div className="avatar">
              <Avatar className={classes.avatar} alt={user.data.name} src={imagePreview ? imagePreview : process.env.REACT_APP_BASE_URL.replace('api/', '') + user.data.image} />
              <input type="file" accept="image/*" id="fileInput" label="Upload image" onChange={(e) => { setFile(e.target.files[0]); setImagePreview(URL.createObjectURL(e.target.files[0])) }} />
              <IconButton className={classes.camera} onClick={() => document.getElementById('fileInput').click()} component="span">
                <PhotoCamera />
              </IconButton>
            </div>
            <TextField
              defaultValue={data.name}
              className={classes.textField}
              required
              name="name"
              onChange={(e) => handleInput(e)}
              label="Name"
              variant="outlined" />
            <TextField
              defaultValue={data.email}
              className={classes.textField}
              required
              name="email"
              onChange={(e) => handleInput(e)}
              label="Email"
              variant="outlined" />
            <FormControl variant="outlined">
              <InputLabel className={classes.outlinedLabel} htmlFor="outlined-adornment-password">Password *</InputLabel>
              <OutlinedInput
                required
                className={classes.outlined}
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(event) => event.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={90}
              />
            </FormControl>
            <div className="changePassword" onClick={() => setChangePassword(!changePassword)}>Change password ?</div>
            {changePassword && (<><FormControl variant="outlined">
              <InputLabel className={classes.outlinedLabel} htmlFor="outlined-adornment-new-password">New password</InputLabel>
              <OutlinedInput
                className={classes.outlined}
                id="outlined-adornment-new-password"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setData({ ...data, newPassword: e.target.value })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      onMouseDown={(event) => event.preventDefault()}
                      edge="end"
                    >
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={120}
              />
            </FormControl>
              <FormControl variant="outlined">
                <InputLabel className={classes.outlinedLabel} htmlFor="outlined-adornment-password-check">Password check</InputLabel>
                <OutlinedInput
                  className={classes.outlined}
                  id="outlined-adornment-password-check"
                  type={showPasswordCheck ? 'text' : 'password'}
                  onChange={(e) => setData({ ...data, passwordCheck: e.target.value })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                        onMouseDown={(event) => event.preventDefault()}
                        edge="end"
                      >
                        {showPasswordCheck ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={120}
                />
              </FormControl>
            </>)}

            <Button
              disabled={user.isLoading}
              type="submit"
              variant="contained"
              className={classes.buttonSubmit}
              startIcon={user.isLoading && <CircularProgress color="secondary" size={20} />}>
              Update
      </Button>
          </FormGroup>
        </form>
      </div>
    </div>
  );
}

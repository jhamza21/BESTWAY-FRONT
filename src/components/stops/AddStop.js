import React, { useState } from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ArrowBack, Save } from '@material-ui/icons';
import { FormGroup, TextField, Button, CircularProgress, Divider, Slider, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core';
import useStyles from "../shared/material-ui-css"
import "./style.css"
import "../shared/style.css"
import { useDispatch, useSelector } from "react-redux"
import { addStop } from "../../redux/stops/stopAction";
import history from "../../services/history"
import Map from "../map/Map"

export default function AddStop(props) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.stops.isLoading)
  const classes = useStyles();
  //VARIABLE TO STORE FORM DATA
  const [data, setData] = useState({ priority: 2 });
  const skills = ['MEN', 'WOMAN', 'ARABIC SPEAKER', 'REFRIGIRATED'];
  //HANDLE TEXTFIELD INPUTS
  const handleInput = (name, value) => {
    if (!value) delete data[name]
    else
      setData({ ...data, [name]: value });
  };

  //RESET FORM
  const reset = () => {
    document.getElementById("form").reset();
    setData({});
  }
  //SUBMIT FORM
  const submit = async (e) => {
    e.preventDefault();
    dispatch(addStop(data))
  };
  return (
    <>
      <div className="containerLeft">
        <div className="formContainer">
          <div className="title">
            <ArrowBack className="backButton" onClick={() => history.push("/stops")} />
            <div> ADD STOP</div>
          </div>
          <Divider />
          <form onSubmit={submit} id="form">
            <FormGroup row={true} className={classes.form}>
              <TextField
                className={classes.textField}
                required
                onChange={(e) => handleInput("name", e.target.value)}
                label="Stop's name"
                variant="outlined" />
              <TextField
                className={classes.textField}
                required
                value={data.address ? data.address.location_id : ""}
                label="Address"
                placeholder="Select location from map"
                variant="outlined" />
              <FormControl variant="outlined">
                <InputLabel className={classes.outlinedLabel} htmlFor="duration">Duration</InputLabel>
                <OutlinedInput
                  className={classes.outlined}
                  id="duration"
                  type="number"
                  onChange={(e) => handleInput("duration", e.target.value)}
                  endAdornment={<InputAdornment position="end">mn</InputAdornment>}
                  labelWidth={70} />
              </FormControl>
              <FormGroup row={true}>
                <Typography id="discrete-slider-small-steps" gutterBottom>
                  Priority
      </Typography>
                <Slider
                  onChange={(e) => handleInput("priority", e.target.value)}
                  defaultValue={2}
                  aria-labelledby="discrete-slider-small-steps"
                  step={1}
                  marks
                  min={1}
                  max={10}
                  valueLabelDisplay="auto" />
              </FormGroup>
              <FormControl variant="outlined">
                <InputLabel className={classes.outlinedLabel} htmlFor="volume">Volume</InputLabel>
                <OutlinedInput
                  className={classes.outlined}
                  id="volume"
                  type="number"
                  onChange={(e) => handleInput("volume", e.target.value)}
                  endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                  labelWidth={70} />
              </FormControl>
              <FormControl variant="outlined">
                <InputLabel className={classes.outlinedLabel} htmlFor="weight">Weight</InputLabel>
                <OutlinedInput
                  className={classes.outlined}
                  id="weight"
                  type="number"
                  onChange={(e) => handleInput("weight", e.target.value)}
                  endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                  labelWidth={70} />
              </FormControl>
              <Autocomplete
                freeSolo
                onChange={(e, value) => handleInput("required_skills", value)}
                multiple={true}
                options={skills}
                renderInput={(params) => <TextField {...params} label="Required skills" variant="outlined" className={classes.textField}
                />} />
              <TextField
                className={classes.textField}
                onChange={(e) => handleInput("note", e.target.value)}
                label="Note"
                variant="outlined" />
              <TextField
                className={classes.textField}
                onChange={(e) => handleInput("email", e.target.value)}
                label="Email"
                variant="outlined" />
              <TextField
                className={classes.textField}
                onChange={(e) => handleInput("mobile_number", e.target.value)}
                label="Mobile number"
                variant="outlined" />
              <TextField
                className={classes.textField}
                required
                label="Start time"
                onChange={(e) => handleInput("from", e.target.value)}
                type="time"
                variant="outlined"
                InputLabelProps={{ shrink: true, }} />
              <TextField
                className={classes.textField}
                required
                label="End time"
                onChange={(e) => handleInput("to", e.target.value)}
                type="time"
                variant="outlined"
                InputLabelProps={{ shrink: true, }} />
              <TextField
                className={classes.textField}
                label="Start date"
                required
                onChange={(e) => handleInput("dateFrom", e.target.value)}
                type="date"
                variant="outlined"
                InputLabelProps={{ shrink: true, }} />
              <TextField
                className={classes.textField}
                label="End date"
                required
                onChange={(e) => handleInput("dateTo", e.target.value)}
                type="date"
                variant="outlined"
                InputLabelProps={{ shrink: true, }} />
              <Button
                disabled={isLoading}
                type="reset"
                onClick={reset}
                size="small" >
                Reset
        </Button>
              <Button
                disabled={isLoading}
                type="submit"
                variant="contained"
                className={classes.buttonSubmit}
                startIcon={isLoading ? <CircularProgress color="secondary" size={20} /> : <Save />}>
                Save
      </Button>
            </FormGroup>
          </form>
        </div>
      </div>
      <div className="containerRight">
        <Map
          changeAddress={(adr) => handleInput("address", adr)}
          markers={[]}
          click={true}
          points={[]}
          clear={false}
        />
      </div>
    </>
  );
}

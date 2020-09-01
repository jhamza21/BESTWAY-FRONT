import React, { useState } from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ArrowBack, Save } from '@material-ui/icons';
import { FormGroup, TextField, Button, Divider, Slider, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core';
import useStyles from "../shared/material-ui-css"
import { useDispatch } from "react-redux"
import history from "../../services/history";
import Map from "../map/Map"
import { updateUploadStop } from "../../redux/uploadStops/stopAction";

export default function UpdateUploadStopS(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  //VARIABLE TO STORE FORM DATA
  const [data, setData] = useState(props.location.state.stop);
  const skills = ['MEN', 'WOMAN', 'ARABIC SPEAKER', 'REFRIGIRATED'];
  //HANDLE TEXTFIELD INPUTS
  const handleInput = (name, value) => {
    if (!value) delete data[name]
    else
      setData({ ...data, [name]: value });
  };


  //SUBMIT FORM
  const submit = async (e) => {
    e.preventDefault();
    dispatch(updateUploadStop(props.location.state.id, data))
  };


  return (
    <>
      <div className="containerLeft">
        <div className="formContainer">
          <div className="title">
            <ArrowBack className="backButton" onClick={() => history.push("/stops/upload")} />
            <div> UPDATE STOP</div>
          </div>
          <Divider />
          <form onSubmit={submit}>
            <FormGroup row={true} className={classes.form}>
              <TextField
                className={classes.textField}
                required
                defaultValue={data.name}
                onChange={(e) => handleInput("name", e.target.value)}
                label="Stop's name"
                variant="outlined" />
              <TextField
                className={classes.textField}
                required
                value={data.address || ""}
                label="Address"
                placeholder="Select location from map"
                variant="outlined" />
              <FormControl variant="outlined">
                <InputLabel className={classes.outlinedLabel} htmlFor="duration">Duration</InputLabel>
                <OutlinedInput
                  className={classes.outlined}
                  defaultValue={data.duration}
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
                  defaultValue={data.priority}
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
                  defaultValue={data.volume}
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
                  defaultValue={data.weight}
                  id="weight"
                  type="number"
                  onChange={(e) => handleInput("weight", e.target.value)}
                  endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                  labelWidth={70} />
              </FormControl>
              <Autocomplete
                freeSolo
                onChange={(e, value) => handleInput("required_skills", value)}
                defaultValue={!data.required_skills ? [] : [data.required_skills]}
                multiple={true}
                options={skills}
                renderInput={(params) => <TextField {...params} label="Required skills" variant="outlined" className={classes.textField} />} />
              <TextField
                className={classes.textField}
                defaultValue={data.note}
                onChange={(e) => handleInput("note", e.target.value)}
                label="Note"
                variant="outlined" />
              <TextField
                className={classes.textField}
                defaultValue={data.email}
                onChange={(e) => handleInput("email", e.target.value)}
                label="Email"
                variant="outlined" />
              <TextField
                className={classes.textField}
                defaultValue={data.mobile_number}
                onChange={(e) => handleInput("mobile_number", e.target.value)}
                label="Mobile number"
                variant="outlined" />
              <TextField
                className={classes.textField}
                required
                label="Start time"
                onChange={(e) => handleInput("from", e.target.value)}
                defaultValue={data.from}
                type="time"
                variant="outlined"
                InputLabelProps={{ shrink: true, }} />
              <TextField
                className={classes.textField}
                required
                label="End time"
                onChange={(e) => handleInput("to", e.target.value)}
                defaultValue={data.to}
                type="time"
                variant="outlined"
                InputLabelProps={{ shrink: true, }} />
              <TextField
                className={classes.textField}
                label="Start date"
                required
                onChange={(e) => handleInput("dateFrom", e.target.value)}
                defaultValue={data.dateFrom}
                type="date"
                variant="outlined"
                InputLabelProps={{ shrink: true, }} />
              <TextField
                className={classes.textField}
                label="End date"
                required
                defaultValue={data.dateTo}
                onChange={(e) => handleInput("dateTo", e.target.value)}
                type="date"
                variant="outlined"
                InputLabelProps={{ shrink: true, }} />
              <Button
                onClick={() => history.push("/stops/upload")}
                size="small" >
                Cancel
        </Button>
              <Button
                type="submit"
                variant="contained"
                className={classes.buttonSubmit}
                startIcon={<Save />}>
                Update
      </Button>
            </FormGroup>
          </form>
        </div>
      </div>
      <div className="containerRight">
        <Map
          changeAddress={(adr) => handleInput("address", adr.location_id)}
          markers={[]}
          click={true}
          points={[]}
          clear={true}
        />

      </div>
    </>
  );
}


import React, { useState } from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormGroup, TextField, Divider, Slider, Typography, FormControl, OutlinedInput, InputLabel, InputAdornment } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import useStyles from "../shared/material-ui-css"
import history from "../../services/history"
import Map from "../map/Map"

export default function StopDetails(props) {
  const classes = useStyles();
  const [data] = useState(props.location.state.stop);
  const skills = ['MEN', 'WOMAN', 'ARABIC SPEAKER', 'REFRIGIRATED'];
  return (
    <>
      <div className="containerLeft">
        <div className="formContainer">
          <div className="title">
            <ArrowBack className="backButton" onClick={() => history.push("/stops")} />
            <div>STOP DETAILS</div>
          </div>
          <Divider />
          <fieldset disabled="disabled">
            <form >
              <FormGroup row={true} className={classes.form}>
                <TextField
                  required
                  name="name"
                  defaultValue={data.name}
                  label="Stop's name"
                  variant="outlined" />
                <TextField
                  required
                  value={data.address ? data.address.location_id : ""}
                  label="Address"
                  variant="outlined" />
                <FormControl variant="outlined">
                  <InputLabel className={classes.outlinedLabel} htmlFor="duration">Duration</InputLabel>
                  <OutlinedInput
                    className={classes.outlined}
                    defaultValue={data.duration}
                    id="duration"
                    type="number"
                    endAdornment={<InputAdornment position="end">mn</InputAdornment>}
                    labelWidth={70} />
                </FormControl>
                <FormGroup row={true}>
                  <Typography id="discrete-slider-small-steps" gutterBottom>
                    Priority
              </Typography>
                  <Slider
                    valueLabelDisplay="on"
                    defaultValue={data.priority ? data.priority : 2}
                    disabled
                    aria-labelledby="discrete-slider-small-steps"
                    step={1}
                    marks
                    min={1}
                    max={10} />
                </FormGroup>
                <FormControl variant="outlined">
                  <InputLabel className={classes.outlinedLabel} htmlFor="volume">Volume</InputLabel>
                  <OutlinedInput
                    className={classes.outlined}
                    defaultValue={data.volume}
                    id="volume"
                    type="number"
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
                    endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                    labelWidth={70} />
                </FormControl>
                <Autocomplete
                  disabled
                  defaultValue={data.required_skills}
                  multiple={true}
                  options={skills}
                  renderInput={(params) => <TextField {...params} label="Required skills" variant="outlined" />} />
                <TextField
                  name="note"
                  defaultValue={data.note}
                  label="Note"
                  variant="outlined" />
                <TextField
                  name="email"
                  defaultValue={data.email}
                  label="Email"
                  variant="outlined" />
                <TextField
                  name="mobile_number"
                  defaultValue={data.mobile_number}
                  label="Mobile number"
                  variant="outlined" />
                <TextField
                  defaultValue={data.from}
                  label="Start time"
                  type="time"
                  variant="outlined"
                  InputLabelProps={{ shrink: true, }} />
                <TextField
                  defaultValue={data.to}
                  label="End time"
                  type="time"
                  variant="outlined"
                  InputLabelProps={{ shrink: true, }} />
                <TextField
                  label="Start date"
                  defaultValue={data.dateFrom}
                  type="date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true, }} />
                <TextField
                  label="End date"
                  defaultValue={data.dateTo}
                  type="date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true, }} />
              </FormGroup>
            </form>
          </fieldset>
        </div>
      </div>
      <div className="containerRight">
        <Map
          markers={[{ type: "simple", lat: data.address.lat, lng: data.address.lon, data: data.address.location_id }]}
          click={false}
          points={[]}
        />

      </div>
    </>
  );
}


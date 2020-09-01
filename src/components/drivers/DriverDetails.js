import React, { useState } from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DirectionsBike, DirectionsCar, LocalShipping, DirectionsWalk, ArrowBack } from "@material-ui/icons";
import { FormGroup, TextField, Button, ButtonGroup, Divider, InputAdornment, OutlinedInput, InputLabel, FormControl } from '@material-ui/core';
import useStyles from "../shared/material-ui-css"
import history from "../../services/history"
import Map from "../map/Map"

const skills = ['MEN', 'WOMAN', 'ARABIC SPEAKER', 'REFRIGIRATED'];
export default function DriverDetails(props) {
  const classes = useStyles();
  const [data] = useState(props.location.state);

  return (
    <>
      <div className="containerLeft">
        <div className="formContainer">
          <div className="title">
            <ArrowBack className="backButton" onClick={() => history.push("/drivers")} />
            <div>DRIVER DETAILS</div>
          </div>
          <Divider />
          <fieldset disabled="disabled">
            <form >
              <FormGroup row={true} className={classes.form}>
                <TextField
                  required
                  defaultValue={data.name}
                  label="Driver's name"
                  variant="outlined" />
                <ButtonGroup name="profile" >
                  <Button className={data.profile === 'bike' ? "profileItem clicked" : "profileItem"} ><DirectionsBike /></Button>
                  <Button className={data.profile === 'car' ? "profileItem clicked" : "profileItem"} ><DirectionsCar /></Button>
                  <Button className={data.profile === 'foot' ? "profileItem clicked" : "profileItem"} ><DirectionsWalk /></Button>
                  <Button className={data.profile === 'truck' ? "profileItem clicked" : "profileItem"}><LocalShipping /></Button>
                </ButtonGroup>
                <TextField
                  required
                  value={data.start_address ? data.start_address.location_id : ""}
                  label="Start address"
                  variant="outlined" />
                <FormControl variant="outlined">
                  <InputLabel className={classes.outlinedLabel} htmlFor="max_distance">Max distance</InputLabel>
                  <OutlinedInput
                    className={classes.outlined}
                    id="max_distance"
                    type="number"
                    defaultValue={data.max_distance}
                    endAdornment={<InputAdornment position="end">Km</InputAdornment>}
                    labelWidth={100} />
                </FormControl>
                <FormControl variant="outlined">
                  <InputLabel className={classes.outlinedLabel} htmlFor="weight">Weight capacity</InputLabel>
                  <OutlinedInput
                    className={classes.outlined}
                    id="weight"
                    type="number"
                    defaultValue={data.weight_capacity}
                    endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                    labelWidth={130} />
                </FormControl>
                <FormControl variant="outlined">
                  <InputLabel className={classes.outlinedLabel} htmlFor="volume">Volume capacity</InputLabel>
                  <OutlinedInput
                    className={classes.outlined}
                    defaultValue={data.volume_capacity}
                    id="volume"
                    type="number"
                    endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                    labelWidth={130} />
                </FormControl>
                <Autocomplete
                  className={classes.expanded}
                  disabled
                  defaultValue={data.skills}
                  multiple={true}
                  options={skills}
                  renderInput={(params) => <TextField {...params} label="Skills" name="skills" variant="outlined" />} />
                <TextField
                  defaultValue={data.email}
                  label="Email"
                  variant="outlined" />
                <TextField
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
          markers={[{ type: "simple", lat: data.start_address.lat, lng: data.start_address.lon, data: data.start_address.location_id }]}
          click={false}
          points={[]}
        />

      </div>
    </>
  );
}

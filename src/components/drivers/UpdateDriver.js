import React, { useState } from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DirectionsBike, DirectionsCar, LocalShipping, DirectionsWalk, ArrowBack, Save } from "@material-ui/icons";
import { FormGroup, TextField, Button, ButtonGroup, CircularProgress, Divider, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core';
import useStyles from "../shared/material-ui-css"
import { useSelector, useDispatch } from "react-redux"
import { updateDriver } from "../../redux/drivers/driverAction";
import history from "../../services/history"
import Map from "../map/Map"

export default function UpdateDriver(props) {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers)
  const classes = useStyles();
  const [data, setData] = useState(props.location.state);
  const skills = ['MEN', 'WOMAN', 'ARABIC SPEAKER', 'REFRIGIRATED'];
  //HANDLE TEXTFIELD INPUTS
  const handleInput = (name, value) => {
    if (!value) setData({ ...data, [name]: undefined });
    else
      setData({ ...data, [name]: value });
  };


  //SUBMIT FORM
  const submit = async (e) => {
    e.preventDefault();
    dispatch(updateDriver(data._id, data))
  };
  return (
    <>
      <div className="containerLeft">
        <div className="formContainer">
          <div className="title">
            <ArrowBack className="backButton" onClick={() => history.push("/drivers")} />
            <div> UPDATE DRIVER</div>
          </div>
          <Divider />
          <form onSubmit={submit}>
            <FormGroup row={true} className={classes.form}>
              <TextField
                className={classes.textField}
                required
                defaultValue={data.name}
                onChange={(e) => handleInput("name", e.target.value)}
                label="Driver's name"
                variant="outlined" />
              <ButtonGroup name="profile" >
                <Button className={data.profile === 'bike' ? "profileItem clicked" : "profileItem"} onClick={() => handleInput("profile", "bike")}><DirectionsBike /></Button>
                <Button className={data.profile === 'car' ? "profileItem clicked" : "profileItem"} onClick={() => handleInput("profile", "car")}><DirectionsCar /></Button>
                <Button className={data.profile === 'foot' ? "profileItem clicked" : "profileItem"} onClick={() => handleInput("profile", "foot")}><DirectionsWalk /></Button>
                <Button className={data.profile === 'truck' ? "profileItem clicked" : "profileItem"} onClick={() => handleInput("profile", "truck")}><LocalShipping /></Button>
              </ButtonGroup>
              <TextField
                className={classes.textField}
                required
                value={data.start_address ? data.start_address.location_id : ""}
                label="Start address"
                placeholder="Select location from map"
                variant="outlined" />
              <FormControl variant="outlined">
                <InputLabel className={classes.outlinedLabel} htmlFor="max_distance">Max distance</InputLabel>
                <OutlinedInput
                  className={classes.outlined}
                  defaultValue={data.max_distance}
                  id="max_distance"
                  type="number"
                  onChange={(e) => handleInput("max_distance", e.target.value)}
                  endAdornment={<InputAdornment position="end">Km</InputAdornment>}
                  labelWidth={100} />
              </FormControl>
              <FormControl variant="outlined">
                <InputLabel className={classes.outlinedLabel} htmlFor="weight">Weight capacity</InputLabel>
                <OutlinedInput
                  className={classes.outlined}
                  defaultValue={data.weight_capacity}
                  id="weight"
                  type="number"
                  onChange={(e) => handleInput("weight_capacity", e.target.value)}
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
                  onChange={(e) => handleInput("volume_capacity", e.target.value)}
                  endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                  labelWidth={130} />
              </FormControl>
              <Autocomplete
                className={classes.expanded}
                freeSolo
                onChange={(e, value) => handleInput("skills", value)}
                defaultValue={data.skills}
                multiple={true}
                options={skills}
                renderInput={(params) => <TextField {...params} label="Skills" name="skills" variant="outlined" className={classes.textField}
                />} />
              <TextField
                className={classes.textField}
                onChange={(e) => handleInput("email", e.target.value)}
                defaultValue={data.email}
                label="Email"
                variant="outlined" />
              <TextField
                className={classes.textField}
                onChange={(e) => handleInput("mobile_number", e.target.value)}
                defaultValue={data.mobile_number}
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
                disabled={drivers.isLoading}
                onClick={() => history.push("/drivers")}
                size="small" >
                Cancel
        </Button>
              <Button
                disabled={drivers.isLoading}
                type="submit"
                variant="contained"
                className={classes.buttonSubmit}
                startIcon={drivers.isLoading ? <CircularProgress color="secondary" size={20} /> : <Save />}>
                Update
    </Button>
            </FormGroup>
          </form>
        </div>
      </div>
      <div className="containerRight">
        <Map
          changeAddress={(adr) => handleInput("start_address", adr)}
          markers={[{ type: "simple", lat: data.start_address.lat, lng: data.start_address.lon, data: data.start_address.location_id }]}
          click={true}
          points={[]}
          clear={true}
        />

      </div>
    </>
  );
}

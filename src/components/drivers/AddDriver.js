import React, { useState, useEffect } from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DirectionsBike, DirectionsCar, LocalShipping, DirectionsWalk, Save, ArrowBack } from "@material-ui/icons";
import { FormGroup, TextField, Button, ButtonGroup, CircularProgress, Divider, InputAdornment, OutlinedInput, InputLabel, FormControl } from '@material-ui/core';
import useStyles from "../shared/material-ui-css"
import "./style.css"
import "../shared/style.css";
import { useSelector, useDispatch } from "react-redux"
import { addDriver } from "../../redux/drivers/driverAction";
import history from "../../services/history"
import Map from "../map/Map"
export default function AddDriver(props) {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers)
  const classes = useStyles();
  //VARIABLE TO STORE FORM DATA
  const [data, setData] = useState({
    profile: "car"
  });
  //SELECTED ADDRESS(START_ADDRESS/END_ADDRESS)
  const skills = ['MEN', 'WOMAN', 'ARABIC SPEAKER', 'REFRIGIRATED'];
  //HANDLE TEXTFIELD INPUTS
  const handleInput = (name, value) => {
    if (!value) delete data[name]
    else
      setData({ ...data, [name]: value });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => handleInput("start_address", props.start_address), [props.start_address]);

  //RESET FORM
  const reset = () => {
    document.getElementById("form").reset();
    setData({
      profile: "car"
    });
  }
  //SUBMIT FORM
  const submit = async (e) => {
    e.preventDefault();
    dispatch(addDriver(data))
  };

  return (
    <>
      <div className="containerLeft">
        <div className="formContainer">
          <div className="title">
            <ArrowBack className="backButton" onClick={() => history.push("/drivers")} />
            <div> ADD DRIVER</div>
          </div>
          <Divider />
          <form onSubmit={submit} id="form">
            <FormGroup row={true} className={classes.form}>
              <TextField
                className={classes.textField}
                required
                onChange={(e) => handleInput("name", e.target.value)}
                label="Driver's name"
                variant="outlined" />
              <ButtonGroup className={classes.textField} name="profile" >
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
                  id="volume"
                  type="number"
                  min="0"
                  onChange={(e) => handleInput("volume_capacity", e.target.value)}
                  endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                  labelWidth={130} />
              </FormControl>
              <Autocomplete
                className={classes.expanded}
                onChange={(e, value) => handleInput("skills", value)}
                freeSolo
                multiple={true}
                options={skills}
                renderInput={(params) => <TextField {...params} label="Skills" name="skills" variant="outlined" className={classes.textField}
                />} />
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
                disabled={drivers.loading}
                type="reset"
                onClick={reset}
                size="small" >
                Reset
        </Button>
              <Button
                disabled={drivers.isLoading}
                type="submit"
                variant="contained"
                className={classes.buttonSubmit}
                startIcon={drivers.isLoading ? <CircularProgress color="secondary" size={20} /> : <Save />}>
                Save
        </Button>
            </FormGroup>
          </form>
        </div>
      </div>
      <div className="containerRight">
        <Map
          changeAddress={(adr) => handleInput("start_address", adr)}
          markers={[]}
          click={true}
          points={[]}
          clear={false}
        />
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { EmojiObjects, LocalShipping, LocationOn } from '@material-ui/icons';
import AuthOptions from "./AuthOptions";
import ConfirmationNotice from "../shared/ConfirmationNotice";
import { Button } from '@material-ui/core';
import { useSelector } from "react-redux"
import useStyles from "../shared/material-ui-css";

export default function Toolbar(props) {
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector((state) => state.user)
  const [activeItem, setActiveItem] = useState();
  const [routingAlert, setRoutingAlert] = useState(false);

  useEffect(() => {
    history.listen((location) => {
      if (location.pathname.search("drivers") !== -1) setActiveItem(0)
      else
        if (location.pathname.search("routing") !== -1) setActiveItem(2)
        else
        if (location.pathname.search("stops") !== -1) setActiveItem(1)
        else
        setActiveItem()
    })
  }, [history])

  const drivers = () => {
    history.push("/drivers");
  };

  const stops = () => {
    history.push("/stops");
  };
  const routing = () => {
    setRoutingAlert(true)
  };

  return (
    <>
      <ConfirmationNotice
        title={"ROUTING"}
        message={"Generating a new solution or consult your old solution ?"}
        buttonA={"NEW SOLUTTION"}
        buttonB={"OLD SOLUTION"}
        show={routingAlert}
        handleClose={() => setRoutingAlert(false)}
        actionA={() => history.push("/routing", true)}
        actionB={() => history.push("/routing", false)} />
      <header className="toolbar">
        <nav className="toolbar_nav">
          <div className="nav_items_left">
            <div className="logo" onClick={drivers}>BESTWAY</div>
          </div>
          <div
            className={
              user.isLoggedIn ? "nav_items_center" : "nav_items_center hidden"
            }
          >

            <Button
              onClick={drivers}
              className={activeItem === 0 ? classes.activeToolbarButton : classes.toolbarButton}
              startIcon={<LocalShipping />}>
              DRIVERS
      </Button>
            <Button
              onClick={stops}
              className={activeItem === 1 ? classes.activeToolbarButton : classes.toolbarButton}
              startIcon={<LocationOn />}>
              STOPS
      </Button>
            <Button
              onClick={routing}
              className={activeItem === 2 ? classes.activeToolbarButton : classes.toolbarButton}
              startIcon={<EmojiObjects />}>
              ROUTING
      </Button>
          </div>
          <div
            className={
              user.isLoggedIn ? "nav_items_right" : "nav_items_right hidden"
            }
          >
            <AuthOptions />
          </div>
        </nav>
      </header>
    </>
  );
}

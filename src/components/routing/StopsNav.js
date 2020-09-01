import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, LocationOn, NotInterested } from '@material-ui/icons';

export default function StopsNav(props) {
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [stops, setStops] = useState(props.stops);
  const [showUnassigned, setShowUnassigned] = useState(false);

  useEffect(() => setStops(props.stops), [props.stops]);
  function filterStops(e) {
    e.target.value
      ? setStops(
        props.stops.filter((stop) =>
          getName(stop).toLowerCase().includes(e.target.value.toLowerCase())
        )
      )
      : setStops(props.stops);
  }

  function getName(stop) {
    return stop.name ? stop.name : stop.type.toUpperCase();
  }
  return (
    <>
      <div
        className={isOpenNav ? "buttonRightNav" : "buttonRightNav close"}
        onClick={() => setIsOpenNav(!isOpenNav)}>
        {isOpenNav ? (
          <ArrowRight />
        ) : (
            <ArrowLeft />
          )}
      </div>
      <nav className={isOpenNav ? "stopsNav" : "stopsNav close"}>
        <input
          placeholder="Search..."
          onChange={filterStops}
          className="search"
        />
        {!showUnassigned ? (
          stops.length === 0 ? <div className="noData">NO STOPS</div> :
            stops.map((e, index) => (
              <div
                className={"item " + e.type}
                data={index}
                key={e._id ? e._id : e.type}
                onClick={(e) => props.selectStop(e.target.getAttribute("data"))}  >
                <LocationOn />
                <div className="itemName">{getName(e)}</div>
              </div>
            ))) : (props.unassigned.map((e) => (
              props.unassigned.length === 0 ? <div className="noData">NO UNASSIGNED STOPS</div> :
                <div
                  className="item"
                  key={e.name}
                >
                  <NotInterested />
                  <div className="itemName">{e.name}</div>
                  <div className="info right">
                    <b>Name : </b>
                    {e.name}
                    <br />
                    <b>Reason : </b>
                    {e.reason}
                  </div>
                </div>
            )))}
        <div className="unassigned" onClick={() => setShowUnassigned(!showUnassigned)}>{showUnassigned ? "SERVED STOPS" : "UNSERVED STOPS"}</div>
      </nav>
    </>
  );
}

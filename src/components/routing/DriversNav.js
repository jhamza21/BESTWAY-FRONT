import React, { useState } from "react";
import "./style.css";
import { DirectionsBike, DirectionsCar, LocalShipping, DirectionsWalk, ArrowLeft, ArrowRight } from "@material-ui/icons";


export default function LeftNav(props) {
  const [isOpenNav, setIsOpenNav] = useState(true);
  const [activeDriver, setActiveDriver] = useState();
  const [drivers, setDrivers] = useState(props.drivers);
  //CONVERT SECONDS TO TIME FORMAT HH:MM
  function getTime(time) {
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time - (hours * 3600)) / 60);
    return hours + ' H ' + minutes + ' mn';
  }
  //CONVERT METERS TO DISTANCE FORMAT
  function getDistance(distance) {
    var km = Math.floor(distance / 1000);
    var m = Math.floor((distance - (km * 1000)) / 60);
    return km + ' Km ' + m + ' m';
  }
  function filterDrivers(e) {
    e.target.value
      ? setDrivers(
        props.drivers.filter((driver) =>
          driver.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      )
      : setDrivers(props.drivers);
  }
  return (
    <>
      <div
        className={isOpenNav ? "buttonLeftNav" : "buttonLeftNav close"}
        onClick={() => setIsOpenNav(!isOpenNav)}
      >
        {isOpenNav ? (
          <ArrowLeft />
        ) : (
            <ArrowRight />
          )}
      </div>
      <div className={isOpenNav ? "driversNav" : "driversNav close"}>
        <input
          placeholder="Search..."
          onChange={filterDrivers}
          className="search"
        />
        {drivers.length === 0 ? (
          <div className="noData">NO DRIVERS</div>
        ) : (
            <>
              {drivers.map((e, index) => (
                <div
                  data={e._id}
                  className={activeDriver === index ? "item active" : "item"}
                  key={e._id}
                  onClick={(e) => {
                    setActiveDriver(index);
                    props.selectDriver(e.target.getAttribute("data"));
                  }}
                >
                  {e.profile === 'bike' ? <DirectionsBike /> : e.profile === 'foot' ? <DirectionsWalk /> : e.profile === 'truck' ? <LocalShipping /> : <DirectionsCar />}
                  <div className="itemName" data={e._id} onClick={(e) => {
                    setActiveDriver(index);
                    props.selectDriver(e.target.getAttribute("data"));
                  }}>{e.name}</div>
                  <div className="info left" data={e._id} onClick={(e) => {
                    setActiveDriver(index);
                    props.selectDriver(e.target.getAttribute("data"));
                  }}>
                    <b>Name : </b>{e.name}<br />
                    <b>N° Stops : </b>{e.stops.length - 2}<br />
                    <b>Distance : </b>{getDistance(e.distance)}<br />
                    <b>Working time : </b>{getTime(e.time)}<br />
                  </div>
                </div>

              ))}
            </>
          )}
      </div>
    </>
  );
}

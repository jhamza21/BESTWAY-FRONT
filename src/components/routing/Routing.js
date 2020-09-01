import React, { useState, useEffect } from "react";
import Map from "../map/Map";
import StopsNav from "./StopsNav";
import DriversNav from "./DriversNav";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector, useDispatch } from "react-redux";
import { oldRouting, newRouting } from "../../redux/routing/routingAction";

export default function Routing(props) {
  const dispatch = useDispatch();
  const routing = useSelector((state) => state.routing)
  const [selectedStop, setSelectedStop] = useState();
  const [stops, setStops] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [points, setPoints] = useState([]);
  function getTimeFromUnixTimeStamp(unixTimeStamp) {
    if (!unixTimeStamp) return "#"
    var date = new Date(unixTimeStamp * 1000);
    return date.toUTCString();
  }
  useEffect(() => {
    //GENERATING NEW SOLUTION
    const generateNewSolution = async () => {
      dispatch(newRouting())
    };
    //GET OLD SOLUTION
    const displayOldSolution = async () => {
      dispatch(oldRouting())
    };
    if (props.location.state) generateNewSolution();
    else displayOldSolution()
  }, [props.location.state, dispatch]
  );
  //CONVERT SECONDS TO TIME FORMAT HH:MM
  function getTime(time) {
    var days = Math.floor(time / 86400);
    var hours = Math.floor((time - (days * 86400)) / 3600);
    var minutes = Math.floor((time - (days * 86400) - (hours * 3600)) / 60);
    return days + ' d ' + hours + ' h ' + minutes + ' m';
  }
  //CONVERT METERS TO DISTANCE FORMAT
  function getDistance(distance) {
    var km = Math.floor(distance / 1000);
    var m = Math.floor((distance - (km * 1000)) / 60);
    return km + ' Km ' + m + ' m';
  }
  function getMarkers(stops) {
    let markers = [];
    stops.forEach((stop, index) => {
      let name = stop.name ? stop.name : "";
      markers.push({
        lat: stop.address.lat,
        lng: stop.address.lon,
        type: stop.type,
        text: index,
        color: "blue",
        data: '<div style="width:300px">' +
          "<b>" +
          name +
          " (" +
          stop.type.toUpperCase() +
          ") </b></br><b>Address: </b>" +
          stop.address.location_id +
          "</br><b>Arrived at: </b>" +
          getTimeFromUnixTimeStamp(stop.served_at) +
          "</br><b>Left at: </b>" +
          getTimeFromUnixTimeStamp(stop.end_time) +
          "</br><b>Waiting time: </b>" +
          getTime(stop.waiting_time) +
          "</br><b>Distance traveled: </b>" +
          getDistance(stop.distance) +
          "</br><b>Driving time: </b>" +
          getTime(stop.driving_time) + "</div>"
      });
    });
    return markers;
  }
  function selectDriver(id) {

    const driver = routing.data.routes.find(
      (drive) => drive._id === id
    );
    if (driver) {
      setSelectedStop();
      setStops(driver.stops);
      setMarkers(getMarkers(driver.stops));
      setPoints(driver.points);
    }
  }

  return (<div className="fullPage">

    {routing.isLoading && <div className="loading">
      <CircularProgress color="secondary" />
    </div>}

    {routing.data.routes && <>
      <div className="containerMap">
        <Map
          noSearch={true}
          centerMap={selectedStop ? { lat: stops[selectedStop].address.lat, lng: stops[selectedStop].address.lon } : null}
          markers={markers}
          click={false}
          points={points}
        />
      </div>
      <DriversNav
        selectDriver={selectDriver}
        drivers={routing.data.routes}
      />
      <StopsNav stops={stops} selectStop={setSelectedStop} unassigned={routing.data.unassigned} />
    </>}
    {routing.error && <div className="error">{routing.error}
    </div>}
  </div>
  );
}

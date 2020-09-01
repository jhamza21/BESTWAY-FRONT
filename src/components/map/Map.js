import * as React from "react";
import reverseGeocoding from "../../services/ReverseGeocoding";
import AsyncSelect from "react-select/lib/Async";
import geocoding from "../../services/Geocoding";
import "./style.css";
const loadOptions = async (inputValue, callback) => {
  const res = await geocoding(inputValue);
  callback(res);
};
export default class Map extends React.Component {
  mapRef = React.createRef();
  state = {
    address: null,
    map: null,
    ui: null,
  };

  componentDidMount() {
    const defaultCoords = { lat: 36.862499, lng: 10.195556 };
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: process.env.REACT_APP_API_KEY_HERE_MAPS,
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.raster.terrain.map,
      {
        center: defaultCoords,
        zoom: 4,
        pixelRatio: window.devicePixelRatio || 1,
        engineType: H.map.render.RenderEngine.EngineType.P2D,
      }
    );

    // eslint-disable-next-line
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // eslint-disable-next-line
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    this.setState({ map, ui });
    //EVENT CLICK LISTENER
    if (this.props.click) this.getLocationClicked(map, this);
  }
  //GET LOCATION CLICKED FROM MAP
  getLocationClicked(map, props) {
    map.addEventListener("tap", async function (evt) {
      var coord = map.screenToGeo(
        evt.currentPointer.viewportX,
        evt.currentPointer.viewportY
      );
      //REVERSE GEOCODING
      const res = await reverseGeocoding(coord.lat, coord.lng);
      if (res) {
        //  props.props.changeMarker(res);
        props.state.map.removeObjects(props.state.map.getObjects());
        props.setState({ address: res });
        if (props.props.click) props.addMarkersToMap([{ type: "simple", lat: res.lat, lng: res.lon, data: res.location_id }], props.state.ui)
        props.centerMap({ lat: res.lat, lng: res.lon });
        if (props.props.click) props.props.changeAddress(res)
      }
    });
  }
  //ADD POLYLINE IN MAP
  addPolylineToMap(points) {
    const H = window.H;
    var lineStrings = [];
    points.forEach((line) => {
      if (line.type === "LineString") {
        let lineString = new H.geo.LineString();
        line.coordinates.forEach((cord) =>
          lineString.pushPoint({
            lat: cord[1],
            lng: cord[0],
          })
        );
        lineStrings.push(lineString);
      }
    });

    lineStrings.forEach((line) =>
      this.state.map.addObject(
        new H.map.Polyline(line, {
          style: { lineWidth: 4 },
        })
      )
    );
  }
  //ADD MARKERS IN MAP
  addMarkersToMap(markers, ui) {
    const H = window.H;
    var group = new H.map.Group();
    var textMark = process.env.REACT_APP_MARKER;
    markers.forEach((mark) => {
      var marker;
      if (mark.type === "simple") {
        //MARK OF HERE MAPS
        marker = new H.map.Marker(
          { lat: mark.lat, lng: mark.lng });
      } else {
        //SET MARK ICON
        var iconMark = new H.map.Icon(
          mark.type === "service"
            ? textMark.replace("{COLOR}", mark.color).replace("{TEXT}", mark.text)
            : mark.type === "start"
              ? textMark.replace("{COLOR}", "green").replace("{TEXT}", "S")
              : textMark.replace("{COLOR}", "red").replace("{TEXT}", "E")
        );
        marker = new H.map.Marker(
          mark.type === "end" ? { lat: mark.lat, lng: mark.lng + 0.0001 } : { lat: mark.lat, lng: mark.lng },
          { icon: iconMark }
        );
      }
      marker.setData(mark.data);
      group.addObject(marker);
    });
    this.state.map.addObject(group);
    //MARKER LISTNER CLICK TO SHOW BUBBLE
    group.addEventListener(
      "tap",
      function (evt) {
        var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
          content: evt.target.getData(),
        });
        ui.addBubble(bubble);
      },
      false
    );
  }
  //CENETER THE MAP
  centerMap(coords) {
    if (coords) { this.state.map.setCenter(coords); this.state.map.setZoom(13) }

  }
  componentWillUnmount() {
    this.state.map.dispose();
  }

  componentDidUpdate() {
    this.state.map.getViewPort().resize();
    if (this.props.clear) this.state.map.removeObjects(this.state.map.getObjects());
    this.addMarkersToMap(this.props.markers, this.state.ui);
    this.centerMap(this.props.centerMap);
    this.addPolylineToMap(this.props.points);
  }

  render() {
    return <>
      <div className={this.props.noSearch ? "searchMap hide" : "searchMap"}>
        <AsyncSelect
          placeholder="Search here..."
          value={this.state.address ? { label: this.state.address.location_id } : ""}
          onChange={(e) => {
            if (e.value) {
              this.state.map.removeObjects(this.state.map.getObjects());
              this.setState({ address: e.value });
              if (this.props.click) this.addMarkersToMap([{ type: "simple", lat: e.value.lat, lng: e.value.lon, data: e.value.location_id }], this.state.ui)
              if (this.props.click) this.props.changeAddress(e.value);
              if (!this.props.click) this.props.clearCenterMap();
              this.centerMap({ lat: e.value.lat, lng: e.value.lon });
            }
          }}
          loadOptions={loadOptions} />
      </div>
      <div ref={this.mapRef} className="map" />

    </>;
  }
}

import Axios from "axios";

export default async function geocoding(inputValue) {
  const result = await Axios.get(
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    inputValue +
    "&key=" + process.env.REACT_APP_API_KEY_GOOGLE_MAPS
  );
  var res = [];
  if (result.data.status === "OK") {
    result.data.results.forEach((result) => {
      res.push({
        label: result.formatted_address,
        value: {
          location_id: result.formatted_address,
          lat: result.geometry.location.lat,
          lon: result.geometry.location.lng,
        }
      })
    })
  }
  return res;
}
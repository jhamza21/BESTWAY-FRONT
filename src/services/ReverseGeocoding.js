import Axios from "axios";

export default async function reverseGeocoding(lat, lng) {
  const result = await Axios.get(
    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
    lat + "," + lng +
    "&key=" + process.env.REACT_APP_API_KEY_GOOGLE_MAPS
  );

  return result.data.status === "OK" ? {
    location_id: result.data.results[0].formatted_address,
    lat: result.data.results[0].geometry.location.lat,
    lon: result.data.results[0].geometry.location.lng,
  } : null
}
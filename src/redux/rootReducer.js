import { combineReducers } from "redux";
import driverReducer from "./drivers/driverReducer";
import stopReducer from "./stops/stopReducer";
import uploadStopsReducer from "./uploadStops/stopReducer";
import userReducer from "./users/userReducer"
import routingReducer from "./routing/routingReducer";
import toastReducer from "./toast/toastReducer";



const rootReducer = combineReducers({
    toast: toastReducer,
    drivers: driverReducer,
    stops: stopReducer,
    routing: routingReducer,
    user: userReducer,
    uploadStops: uploadStopsReducer
})

export default rootReducer

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import allReducer from "./rootReducer";
import { logger } from "redux-logger";



const store = createStore(allReducer, applyMiddleware(thunk,logger));

export default store
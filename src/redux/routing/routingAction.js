import Axios from "axios"
//NEW ROUTING 
export const routingNewRequest = () => {
    return {
        type: "NEW_ROUTING_REQUEST"
    }
}
export const routingNewSuccess = (routing) => {
    return {
        type: "NEW_ROUTING_SUCCESS",
        payload: routing
    }
}
export const routingNewFailure = (error) => {
    return {
        type: "NEW_ROUTING_FAILURE",
        payload: error
    }
}
export const newRouting = () => {
    return (dispatch) => {
        dispatch(routingNewRequest())
        Axios.get(process.env.REACT_APP_BASE_URL + "routing", {
            headers: { token: localStorage.getItem("token") },
        })
            .then(response => {
                const routing = response.data
                dispatch(routingNewSuccess(routing))
            })
            .catch(error => {
                const errorMsg = error.response.data.error
                dispatch(routingNewFailure(errorMsg))
            })
    }
}
//OLD ROUTING
export const oldRoutingRequest = () => {
    return {
        type: "OLD_ROUTING_REQUEST"
    }
}
export const oldRoutingSuccess = (routing) => {
    return {
        type: "OLD_ROUTING_SUCCESS",
        payload: routing
    }
}
export const oldRoutingFailure = (error) => {
    return {
        type: "OLD_ROUTING_FAILURE",
        payload: error
    }
}
export const oldRouting = (data) => {
    return (dispatch) => {
        dispatch(oldRoutingRequest())
        Axios.get(process.env.REACT_APP_BASE_URL + "solution", {
            headers: { token: localStorage.getItem("token") },
        })
            .then(response => {
                const routing = response.data
                dispatch(oldRoutingSuccess(routing))
            })
            .catch(error => {
                const errorMsg = error.response.data.error
                dispatch(oldRoutingFailure(errorMsg))
            })
    }
}

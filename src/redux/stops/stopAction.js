import Axios from "axios"
import { addToast } from "../toast/toastActions"
import history from "../../services/history"
//FETCH LIST STOPS
export const fetchStopsRequest = () => {
    return {
        type: "FETCH_STOPS_REQUEST"
    }
}
export const fetchStopsSuccess = (stops) => {
    return {
        type: "FETCH_STOPS_SUCCESS",
        payload: stops
    }
}
export const fetchStopsFailure = (error) => {
    return {
        type: "FETCH_STOPS_FAILURE",
        payload: error
    }
}

export const fetchStops = () => {
    return (dispatch) => {
        dispatch(fetchStopsRequest())
        Axios.get(process.env.REACT_APP_BASE_URL + "stop/", {
            headers: {
                token: localStorage.getItem("token"),
            },
        })
            .then(response => {
                const stops = response.data
                dispatch(fetchStopsSuccess(stops))
            })
            .catch(error => {
                const errorMsg = error.response.data.error
                dispatch(fetchStopsFailure(errorMsg))
                dispatch(addToast({ message: errorMsg, color: "red" }))
            })
    }
}

//ADD NEW STOP
export const addStopRequest = () => {
    return {
        type: "ADD_STOP_REQUEST"
    }
}
export const addStopSuccess = (stops) => {
    return {
        type: "ADD_STOP_SUCCESS",
        payload: stops
    }
}
export const addStopFailure = (error) => {
    return {
        type: "ADD_STOP_FAILURE",
        payload: error
    }
}
export const addStop = (data) => {
    return (dispatch) => {
        dispatch(addStopRequest())
        Axios.post(
            process.env.REACT_APP_BASE_URL + "stop/addStop",
            data,
            {
                headers: { token: localStorage.getItem("token") },
            }
        )
            .then(response => {
                const stops = response.data
                dispatch(addStopSuccess(stops))
                dispatch(addToast({ message: "Stop added successfully", color: "green" }))
                history.push('/stops')
            })
            .catch(error => {
                const errorMsg = error.response.data.error
                dispatch(addStopFailure(errorMsg))
                dispatch(addToast({ message: errorMsg, color: "red" }))
            })
    }
}
//UPDATE STOP
export const updateStopRequest = () => {
    return {
        type: "UPDATE_STOP_REQUEST"
    }
}
export const updateStopSuccess = (stop) => {
    return {
        type: "UPDATE_STOP_SUCCESS",
        payload: stop
    }
}
export const updateStopFailure = (error) => {
    return {
        type: "UPDATE_STOP_FAILURE",
        payload: error
    }
}
export const updateStop = (id, data) => {
    return (dispatch) => {
        dispatch(updateStopRequest())
        Axios.post(
            process.env.REACT_APP_BASE_URL + "stop/updateStop/" + id,
            data,
            {
                headers: { token: localStorage.getItem("token") },
            }
        )
            .then(response => {
                const stops = response.data
                dispatch(updateStopSuccess(stops))
                dispatch(addToast({ message: "Stop updated successfully", color: "green" }))
                history.push('/stops')
            })
            .catch(error => {
                const errorMsg = error.response.data.error
                dispatch(updateStopFailure(errorMsg))
                dispatch(addToast({ message: errorMsg, color: "red" }))
            })
    }
}

//DELETE STOP
export const deleteStopRequest = () => {
    return {
        type: "DELETE_STOP_REQUEST"
    }
}
export const deleteStopSuccess = (stops) => {
    return {
        type: "DELETE_STOP_SUCCESS",
        payload: stops
    }
}
export const deleteStopFailure = (error) => {
    return {
        type: "DELETE_STOP_FAILURE",
        payload: error
    }
}
export const deleteStop = (id) => {
    return (dispatch) => {
        dispatch(deleteStopRequest())
        Axios.delete(
            process.env.REACT_APP_BASE_URL + "stop/" + id,
            {
                headers: { token: localStorage.getItem("token") },
            }
        )
            .then(response => {
                const stops = response.data
                dispatch(deleteStopSuccess(stops))
                dispatch(addToast({ message: "Stop deleted successfully", color: "green" }))

            })
            .catch(error => {
                const errorMsg = error.response.data.error
                dispatch(deleteStopFailure(errorMsg))
                dispatch(addToast({ message: errorMsg, color: "red" }))
            })
    }
}

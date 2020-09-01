import Axios from "axios"
import { addToast } from "../toast/toastActions"
import history from "../../services/history"
//FETCH LIST DRIVERS
export const fetchDriversRequest = () => {
    return {
        type: "FETCH_DRIVERS_REQUEST"
    }
}
export const fetchDriversSuccess = (drivers) => {
    return {
        type: "FETCH_DRIVERS_SUCCESS",
        payload: drivers
    }
}
export const fetchDriversFailure = (error) => {
    return {
        type: "FETCH_DRIVERS_FAILURE",
        payload: error
    }
}
export const fetchDrivers = () => {
    return (dispatch) => {
        dispatch(fetchDriversRequest())
        Axios.get(process.env.REACT_APP_BASE_URL + "driver/", {
            headers: {
                token: localStorage.getItem("token"),
            },
        })
            .then(response => {
                const drivers = response.data
                dispatch(fetchDriversSuccess(drivers))
            })
            .catch(error => {
                const errorMsg = error.response.data.error
                dispatch(fetchDriversFailure(errorMsg))
                dispatch(addToast({ message: errorMsg, color: "red" }))
            })
    }
}
//ADD NEW DRIVER
export const addDriverRequest = () => {
    return {
        type: "ADD_DRIVER_REQUEST"
    }
}
export const addDriversSuccess = (driver) => {
    return {
        type: "ADD_DRIVER_SUCCESS",
        payload: driver
    }
}
export const addDriversFailure = (error) => {
    return {
        type: "ADD_DRIVER_FAILURE",
        payload: error
    }
}
export const addDriver = (data) => {
    return (dispatch) => {
        dispatch(addDriverRequest())
        Axios.post(
            process.env.REACT_APP_BASE_URL + "driver/addDriver",
            data,
            {
                headers: { token: localStorage.getItem("token") },
            }
        )
            .then(response => {
                const savedDriver = response.data
                dispatch(addDriversSuccess(savedDriver))
                dispatch(addToast({ message: "Driver added successfully", color: "green" }))
                history.push('/drivers')
            })
            .catch(error => {
                const errorMsg = error.response.data.error
                dispatch(addDriversFailure(errorMsg))
                dispatch(addToast({ message: errorMsg, color: "red" }))
            })
    }
}
//UPDATE DRIVER
export const updateDriverRequest = () => {
    return {
        type: "UPDATE_DRIVER_REQUEST"
    }
}
export const updateDriversSuccess = (driver) => {
    return {
        type: "UPDATE_DRIVER_SUCCESS",
        payload: driver
    }
}
export const updateDriversFailure = (error) => {
    return {
        type: "UPDATE_DRIVER_FAILURE",
        payload: error
    }
}
export const updateDriver = (id, data) => {
    return (dispatch) => {
        dispatch(updateDriverRequest())
        Axios.post(
            process.env.REACT_APP_BASE_URL + "driver/updateDriver/" + id,
            data,
            {
                headers: { token: localStorage.getItem("token") },
            }
        )
            .then(response => {
                const updatedDriver = response.data
                dispatch(updateDriversSuccess(updatedDriver))
                dispatch(addToast({ message: "Driver updated successfully", color: "green" }))
                history.push('/drivers')
            })
            .catch(error => {
                const errorMsg = error.response.data.error
                dispatch(updateDriversFailure(errorMsg))
                dispatch(addToast({ message: errorMsg, color: "red" }))
            })
    }
}

//DELETE DRIVER
export const deleteDriverRequest = () => {
    return {
        type: "DELETE_DRIVER_REQUEST"
    }
}
export const deleteDriversSuccess = (driver) => {
    return {
        type: "DELETE_DRIVER_SUCCESS",
        payload: driver
    }
}
export const deleteDriversFailure = (error) => {
    return {
        type: "DELETE_DRIVER_FAILURE",
        payload: error
    }
}
export const deleteDriver = (id) => {
    return (dispatch) => {
        dispatch(deleteDriverRequest())
        Axios.delete(
            process.env.REACT_APP_BASE_URL + "driver/" + id,
            {
                headers: { token: localStorage.getItem("token") },
            }
        )
            .then(response => {
                const deletedDriver = response.data
                dispatch(deleteDriversSuccess(deletedDriver))
                dispatch(addToast({ message: "Driver deleted successfully", color: "green" }))
            })
            .catch(error => {
                const errorMsg = error.response.data.error
                dispatch(deleteDriversFailure(errorMsg))
                dispatch(addToast({ message: errorMsg, color: "red" }))
            })
    }
}

import Axios from "axios"
import history from '../../services/history'
import { addToast } from "../toast/toastActions"
import { fetchDrivers } from "../drivers/driverAction"
import { fetchStops } from "../stops/stopAction"
//SIGN IN
export const signInRequest = () => {
    return {
        type: "SIGN_IN_REQUEST"
    }
}
export const signInSuccess = (userData) => {
    return {
        type: "SIGN_IN_SUCCESS",
        payload: userData
    }
}
export const signInFailure = (error) => {
    return {
        type: "SIGN_IN_FAILURE",
        payload: error
    }
}

export const signIn = (data) => {
    return (dispatch) => {
        dispatch(signInRequest())
        Axios.post(
            process.env.REACT_APP_BASE_URL + "user/login",
            data
        )
            .then(response => {
                const userData = response.data
                localStorage.setItem("token", userData.token)
                dispatch(signInSuccess(userData.user))
                dispatch(fetchDrivers())
                dispatch(fetchStops())
                history.push("/drivers")
            })
            .catch(error => {
                const errorMsg = error.response.data.error
                dispatch(signInFailure(errorMsg))
                dispatch(addToast({ message: errorMsg, color: "red" }))
            })
    }
}
//UPDATE PROFILE
export const updateProfileRequest = () => {
    return {
        type: "UPDATE_PROFILE_REQUEST"
    }
}
export const updateProfileSuccess = (userData) => {
    return {
        type: "UPDATE_PROFILE_SUCCESS",
        payload: userData
    }
}
export const updateProfileFailure = (error) => {
    return {
        type: "UPDATE_PROFILE_FAILURE",
        payload: error
    }
}

export const updateProfile = (data) => {
    return (dispatch) => {
        dispatch(updateProfileRequest())
        Axios.put(process.env.REACT_APP_BASE_URL + "user/update/", data,
            {
                headers: {
                    token: localStorage.getItem("token"),
                },
            })
            .then(response => {
                const userData = response.data
                console.log(userData)
                dispatch(updateProfileSuccess(userData))
                dispatch(addToast({ message: 'Profile updated successfully', color: "green" }))
                history.push("/drivers")
            })
            .catch(error => {
                const errorMsg = error.response.data.error
                dispatch(updateProfileFailure(errorMsg))
                dispatch(addToast({ message: errorMsg, color: "red" }))
            })
    }
}
//CHECK LOGGED IN
export const checkLoggedInRequest = () => {
    return {
        type: "CHECK_LOGGED_IN_REQUEST"
    }
}
export const checkLoggedInSuccess = (userData) => {
    return {
        type: "CHECK_LOGGED_IN_SUCCESS",
        payload: userData
    }
}
export const checkLoggedInFailure = (error) => {
    return {
        type: "CHECK_LOGGED_IN_FAILURE",
        payload: error
    }
}

export const checkLoggedIn = () => {
    return (dispatch) => {
        dispatch(checkLoggedInRequest())
        let token = localStorage.getItem("token");
        if (token === null) {
            localStorage.setItem("token", "");
            token = "";
        }
        Axios.post(
            process.env.REACT_APP_BASE_URL + "user/tokenIsValid",
            null,
            { headers: { token: token } }
        );
        Axios.get(process.env.REACT_APP_BASE_URL + "user", {
            headers: { token: token },
        })
            .then(response => {
                dispatch(checkLoggedInSuccess(response.data))
                dispatch(fetchDrivers())
                dispatch(fetchStops())
                history.push("/drivers")
            })
            .catch(error => {
                const errorMsg = error.response.data.error
                dispatch(checkLoggedInFailure(errorMsg))
                history.push("/login")
            })
    }
}
//SIGN UP
export const signUpRequest = () => {
    return {
        type: "SIGN_UP_REQUEST"
    }
}
export const signUpSuccess = (userData) => {
    return {
        type: "SIGN_UP_SUCCESS",
        payload: userData
    }
}
export const signUpFailure = (error) => {
    return {
        type: "SIGN_UP_FAILURE",
        payload: error
    }
}

export const signUp = (data) => {
    return (dispatch) => {
        dispatch(signUpRequest())
        Axios.post(process.env.REACT_APP_BASE_URL + "user/register", data)
            .then(response => {
                const userData = response.data
                dispatch(signUpSuccess(userData.user))
                dispatch(signIn({ email: data.email, password: data.password }))
            })
            .catch(error => {
                const errorMsg = error.response.data.error
                dispatch(signUpFailure(errorMsg))
                dispatch(addToast({ message: errorMsg, color: "red" }))
            })
    }
}

//LOGOUT
export const logOut = () => {
    return {
        type: "LOGOUT"
    }
}
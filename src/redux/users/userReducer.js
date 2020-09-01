
import history from '../../services/history'

const initialState = {
    isLoading: false,
    isLoggedIn: false,
    data: {},
    error: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_PROFILE_REQUEST":
            return {
                ...state,
                isLoading: true
            }
        case "UPDATE_PROFILE_SUCCESS":
            return {
                isLoading: false,
                isLoggedIn: true,
                data: action.payload,
                error: ''
            }
        case "UPDATE_PROFILE_FAILURE":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case "CHECK_LOGGED_IN_REQUEST":
            return {
                ...state,
                isLoading: true
            }
        case "CHECK_LOGGED_IN_SUCCESS":
            return {
                isLoading: false,
                isLoggedIn: true,
                data: action.payload,
                error: ''
            }
        case "CHECK_LOGGED_IN_FAILURE":
            return {
                isLoading: false,
                isLoggedIn: false,
                data: {},
                error: action.payload
            }
        case "SIGN_IN_REQUEST":
            return {
                ...state,
                isLoading: true
            }
        case "SIGN_IN_SUCCESS":
            return {
                isLoading: false,
                isLoggedIn: true,
                data: action.payload,
                error: ''
            }
        case "SIGN_IN_FAILURE":
            return {
                isLoading: false,
                isLoggedIn: false,
                data: {},
                error: action.payload
            }
        case "SIGN_UP_REQUEST":
            return {
                ...state,
                isLoading: true
            }
        case "SIGN_UP_SUCCESS":
            return {
                isLoading: false,
                isLoggedIn: false,
                data: action.payload,
                error: ''
            }
        case "SIGN_UP_FAILURE":
            return {
                isLoading: false,
                isLoggedIn: false,
                data: {},
                error: action.payload
            }
        case "LOGOUT":
            localStorage.clear()
            history.push("/login")
            return {
                isLoading: false,
                isLoggedIn: false,
                data: {},
                error: ''
            }

        default: return state
    }
}

export default reducer
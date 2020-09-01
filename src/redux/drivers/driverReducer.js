
const initialState = {
    isLoading: false,
    data: [],
    error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_DRIVERS_REQUEST":
            return {
                ...state,
                isLoading: true
            }
        case "FETCH_DRIVERS_SUCCESS":
            return {
                isLoading: false,
                data: action.payload,
                error: '',
            }
        case "FETCH_DRIVERS_FAILURE":
            return {
                isLoading: false,
                data: [],
                error: action.payload,
            }
        case "ADD_DRIVER_REQUEST":
            return {
                ...state,
                isLoading: true
            }
        case "ADD_DRIVER_SUCCESS":
            return {
                isLoading: false,
                data: action.payload,
                error: '',
            }
        case "ADD_DRIVER_FAILURE":
            return {
                isLoading: false,
                data: [],
                error: action.payload,
            }
        case "DELETE_DRIVER_REQUEST":
            return {
                ...state,
                isLoading: true
            }
        case "DELETE_DRIVER_SUCCESS":
            return {
                isLoading: false,
                data: action.payload,
                error: '',
            }
        case "DELETE_DRIVER_FAILURE":
            return {
                isLoading: false,
                data: [],
                error: action.payload,
            }
        case "UPDATE_DRIVER_REQUEST":
            return {
                ...state,
                isLoading: true,
            }
        case "UPDATE_DRIVER_SUCCESS":
            return {
                isLoading: false,
                data: action.payload,
                error: '',
            }
        case "UPDATE_DRIVER_FAILURE":
            return {
                isLoading: false,
                data: [],
                error: action.payload,
            }
        default: return state
    }
}

export default reducer
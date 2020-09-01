
const initialState = {
    isLoading: false,
    data: [],
    error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_STOPS_REQUEST":
            return {
                ...state,
                isLoading: true,
            }
        case "FETCH_STOPS_SUCCESS":
            return {
                isLoading: false,
                data: action.payload,
                error: '',
            }
        case "FETCH_STOPS_FAILURE":
            return {
                isLoading: false,
                data: [],
                error: action.payload,
            }
        case "ADD_STOP_REQUEST":
            return {
                ...state,
                isLoading: true,
            }
        case "ADD_STOP_SUCCESS":
            return {
                isLoading: false,
                data: action.payload,
                error: '',
            }
        case "ADD_STOP_FAILURE":
            return {
                isLoading: false,
                data: [],
                error: action.payload,
            }
        case "DELETE_STOP_REQUEST":
            return {
                ...state,
                isLoading: true,
            }
        case "DELETE_STOP_SUCCESS":
            return {
                isLoading: false,
                data: action.payload,
                error: '',
            }
        case "DELETE_STOP_FAILURE":
            return {
                isLoading: false,
                data: [],
                error: action.payload,
            }
        case "UPDATE_STOP_REQUEST":
            return {
                ...state,
                isLoading: true,
            }
        case "UPDATE_STOP_SUCCESS":
            return {
                isLoading: false,
                data: action.payload,
                error: '',
            }
        case "UPDATE_STOP_FAILURE":
            return {
                isLoading: false,
                data: [],
                error: action.payload,
                upload: false,
            }
        default: return state
    }
}

export default reducer
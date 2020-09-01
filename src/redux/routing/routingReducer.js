
const initialState = {
    isLoading: false,
    data: [],
    error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "NEW_ROUTING_REQUEST":
            return {
                ...state,
                isLoading: true
            }
        case "NEW_ROUTING_SUCCESS":
            return {
                isLoading: false,
                data: action.payload,
                error: '',
            }
        case "NEW_ROUTING_FAILURE":
            return {
                isLoading: false,
                data: [],
                error: action.payload,
            }
        case "OLD_ROUTING_REQUEST":
            return {
                ...state,
                isLoading: true
            }
        case "OLD_ROUTING_SUCCESS":
            return {
                isLoading: false,
                data: action.payload,
                error: '',
            }
        case "OLD_ROUTING_FAILURE":
            return {
                isLoading: false,
                data: [],
                error: action.payload,
            }
        default: return state
    }
}

export default reducer
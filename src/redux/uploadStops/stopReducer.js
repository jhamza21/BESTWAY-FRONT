
const initialState = {
    data: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_UPLOAD_STOPS":
            return {
                data: action.payload
            }
        case "UPDATE_UPLOAD_STOP":
            return {
                data: state.data.map(stop => {
                    if (stop.__rowNum__ === action.payload.id)
                        return { ...stop, __rowNum__: stop.__rowNum__, ...action.payload.stop }
                    else return { ...stop, __rowNum__: stop.__rowNum__ }
                })
            }
        case "DELETE_UPLOAD_STOP":
            return {
                data: state.data.filter(function (value, index, arr) { return value.__rowNum__ !== action.payload.__rowNum__ })
            }
        default: return state
    }
}

export default reducer
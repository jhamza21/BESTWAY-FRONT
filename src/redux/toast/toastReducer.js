

const initialState = {
    data: "",
    show: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TOAST":
            return {
                data: action.payload,
                show: true
            }
        case "REMOVE_TOAST":
            return {
                data: "",
                show: false
            }
        default: return state
    }
}

export default reducer
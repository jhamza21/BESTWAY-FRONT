

export const addToast = (data) => {
    return {
        type: "ADD_TOAST",
        payload: data
    }
}

export const removeToast = () => {
    return {
        type: "REMOVE_TOAST",
    }
}


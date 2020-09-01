import history from "../../services/history"

export const setUploadStops = (stops) => {
    return {
        type: "SET_UPLOAD_STOPS",
        payload: stops
    }
}
export const updateUploadStop = (id, stop) => {
    history.push('/stops/upload');
    return {
        type: "UPDATE_UPLOAD_STOP",
        payload: { id, stop }
    }
}
export const deleteUploadStop = (stop) => {
    return {
        type: "DELETE_UPLOAD_STOP",
        payload: stop
    }
}


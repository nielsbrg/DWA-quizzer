export function wsConnectionFailed() {
    return {
        type: "WS_CONNECTION_FAILURE",
        payload: "There was an issue establishing a connection to the server. Try again later"
    }
}
export function wsConnectionSuccess() {
    return {
        type: "WS_CONNECTION_SUCCESS",
        payload: "Connection successfully established."
    }
}
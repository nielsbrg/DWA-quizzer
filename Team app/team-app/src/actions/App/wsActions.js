export function storeWsConnection(conn) {
    return {
        type: "STORE_WS",
        payload: conn
    }
}
export function updateOnMessage(res) {
    let returnObj = { type: res.messageType };
    switch(res.messageType) {
        case "TOGGLE_READYSTATE_OK": {
            returnObj.payload = res.isReady; break;
        }
        case "ANSWER_RESULT": {
            returnObj.payload = res.isCorrect; break;
        }
        default: return passOnMessage(res);
    }
    return returnObj;
}

export function onWsClose() {
    return {
        type: "WS_CLOSE",
        payload: "The connection was closed."
    }
}

export function onWsFail() {
    return {
        type: "WS_ERROR",
        payload: "Something went wrong with the connection."
    }
}

export function onWsOpen() {
    return {
        type: "WS_OPEN",
        payload: "Connection successfully established."
    }
}

export function onWsStart() {
    return {
        type: "WS_START",
        payload: "Attempting to make a connection"
    }
}

function passOnMessage(res) {
    return { type: res.messageType, payload: res.message };
}
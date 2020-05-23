export function updateBasedOnMessage(msg) {
    switch(msg.messageType) {
        default: return {type: msg.messageType, payload: msg.message}
    }
}

export function onWsOpen() {
    return {
        type: "WS_OPEN"
    }
}
export function onWsClose() {
    return {
        type: "WS_CLOSE"
    }
}

export function onWsError() {
    return {
        type: "WS_ERROR"
    }
}

export function storeWsConnection(conn) {
    return {
        type: "STORE_WS_CONNECTION",
        payload: conn
    }
}
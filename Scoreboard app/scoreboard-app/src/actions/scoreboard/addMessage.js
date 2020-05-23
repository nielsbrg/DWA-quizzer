export function addMessage(type, msg) {
    return {
        type: type,
        payload: msg
    }
}

export function addErrorMessage(type, msg) {
    return {
        type: type,
        payload: msg
    }
}
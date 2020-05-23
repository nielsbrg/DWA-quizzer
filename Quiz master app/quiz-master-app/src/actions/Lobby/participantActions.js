export function notifyKickAllParticipants() {
    return {
        type: "KICK_ALL_PARTICIPANTS_NOTIFY"
    }
}

export function kickAllUsers() {
    return {
        type: "KICK_ALL_USERS"
    }
}

export function cancelKickAll() {
    return {
        type: "KICK_ALL_CANCEL",
    }
}

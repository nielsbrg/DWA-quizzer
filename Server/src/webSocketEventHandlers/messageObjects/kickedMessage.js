const kickedMsg = {
    messageType: "KICKED",
    message: "You were removed from the quiz by the quiz master."
};

function generateKickedSuccessMsg(name) {
    return {
        messageType: "KICK_USER_SUCCESS",
        name: name
    }
}

const kickedAllSuccessMsg = {
    messageType: "KICK_ALL_USERS_SUCCESS"
};

module.exports = {
    kickedMsg,
    generateKickedSuccessMsg,
    kickedAllSuccessMsg
};
const quizMasterDisconnected = {
    messageType: "QUIZ_MASTER_DISCONNECTED",
    message: "The quiz master lost connection with the server."
};

function generateTeamDisconnectedMsg(teamName) {
    return {messageType: "TEAM_DISCONNECTED", name: teamName};
}

module.exports = {
    quizMasterDisconnected,
    generateTeamDisconnectedMsg
};
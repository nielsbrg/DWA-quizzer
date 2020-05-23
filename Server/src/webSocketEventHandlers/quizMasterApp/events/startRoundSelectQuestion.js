module.exports = function startRoundSelectQuestion(wss, socket, msg)  {
    socket.quizMaster.teamSockets.forEach(team => {
        team.send(JSON.stringify({
            messageType: "START_ROUND_SELECT_QUESTION",
            message: "The quiz master has chosen the categories for this round. Preparing questions..."
        }))
    });
};
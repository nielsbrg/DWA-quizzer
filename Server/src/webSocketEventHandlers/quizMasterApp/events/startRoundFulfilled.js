module.exports = function startRoundNotify(wss, socket, msg) {
    if(socket.quizMaster.attachedScoreboardSocket) {
        socket.quizMaster.attachedScoreboardSocket.send(JSON.stringify(
            {
                messageType: "START_ROUND_FULFILLED",
                message: {
                    roundNumber: msg.roundNumber,
                    teams: msg.teams
                }
            }
        ));
    }
};
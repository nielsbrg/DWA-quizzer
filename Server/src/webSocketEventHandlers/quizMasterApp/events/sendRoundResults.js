module.exports = function sendRoundResults(wss, socket, msg) {
    if(socket.quizMaster.attachedScoreboardSocket) {
        socket.quizMaster.attachedScoreboardSocket.send(JSON.stringify({
            messageType: "END_QUIZ_ROUND_RESULTS",
            message: msg.finalTeams
        }));
    }
};
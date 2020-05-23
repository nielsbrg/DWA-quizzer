module.exports = function startNewQuestion(wss, socket, msg) {
    socket.quizMaster.teamSockets.forEach(client => {
        client.send(JSON.stringify({
            messageType: "START_NEXT_QUESTION_IN_ROUND",
            message: "The quiz master is now selecting a new question.."
        }));
    });
    if(socket.quizMaster.attachedScoreboardSocket) {
        socket.quizMaster.attachedScoreboardSocket.send(JSON.stringify({messageType: "START_NEXT_QUESTION"}));
    }
};
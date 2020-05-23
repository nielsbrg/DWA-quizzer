module.exports = function submitAnswer(wss, socket, msg) {
    socket.team.currentAnswer = msg.answer;
    socket.send(JSON.stringify({messageType: "ANSWER_REGISTERED", message: "Your answer has been registered."}));
    socket.team.attachedQuizMasterSocket.send(JSON.stringify({
        messageType: "TEAM_ANSWERED",
        teamName: socket.team.name
    }));
    if(socket.team.attachedQuizMasterSocket.quizMaster.attachedScoreboardSocket) {
        socket.team.attachedQuizMasterSocket.quizMaster.attachedScoreboardSocket.send(JSON.stringify({
            messageType: "TEAM_SUBMITTED_ANSWER",
            message: {
                teamName: socket.team.name
            }
        }));
    }
};
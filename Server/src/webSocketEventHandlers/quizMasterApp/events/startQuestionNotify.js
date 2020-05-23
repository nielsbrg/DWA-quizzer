module.exports = function startQuestionNotify(wss, socket, msg) {
    socket.quizMaster.teamSockets.forEach(teamSocket => {
        teamSocket.send(JSON.stringify({
            messageType: "START_NEW_QUESTION",
            message: msg.question.question
        }));
        teamSocket.team.currentAnswer = undefined;
    });

    //send question to scoreboard
    if(socket.quizMaster.attachedScoreboardSocket) {
        socket.quizMaster.attachedScoreboardSocket.send(JSON.stringify({
            messageType: "START_NEW_QUESTION",
            message: msg.question
        }))
    }
};

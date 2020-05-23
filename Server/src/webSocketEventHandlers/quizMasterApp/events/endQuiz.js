module.exports = function endQuiz(wss, socket, msg) {
    socket.quizMaster.teamSockets.forEach(teamSocket => {
        teamSocket.send(JSON.stringify({messageType: "QUIZ_MASTER_ENDED_QUIZ", message: "The quiz master has ended the quiz."}));
    });

    socket.send(JSON.stringify({
        messageType: "QUIZ_MASTER_ENDED_QUIZ_SUCCESS",
        message: "You have successfully ended the quiz."
    }));

    socket.quizMaster.isActive = false;
    if(socket.quizMaster.attachedScoreboardSocket) {
        socket.quizMaster.attachedScoreboardSocket.send(JSON.stringify({
            messageType: "END_QUIZ",
            message: "The quiz master has ended the quiz. Results will no longer be updated in realtime."
        }));
    }
    socket.close();
};
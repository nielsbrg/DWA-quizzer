module.exports = function closeQuestion(wss,socket,msg) {
    let answers = socket.quizMaster.teamSockets.reduce((result, currentTeamSocket) => {
        let teamAnswer = currentTeamSocket.team.currentAnswer;
        if(teamAnswer === undefined) {
            teamAnswer = "Did not answer";
        }
        result.push({teamName: currentTeamSocket.team.name, answer: teamAnswer});
        currentTeamSocket.send(JSON.stringify({messageType: "CLOSE_QUESTION", message: "The quiz master closed the question and is now evaluating the answers."}));
        return result;
    }, []);

    console.log(answers);

    socket.send(JSON.stringify({
        messageType: "CLOSE_QUESTION_SUCCESS",
        answers: answers
    }));

    if(socket.quizMaster.attachedScoreboardSocket) {
        socket.quizMaster.attachedScoreboardSocket.send(JSON.stringify({
            messageType: "CLOSE_QUESTION",
            message: answers
        }))
    }
};
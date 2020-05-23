module.exports = function quizHasStarted(wss, socket, msg) {
    socket.quizMaster.isActive = true;
    let rejectedTeamSockets = [];
    for(let teamName of socket.quizMaster.acceptedTeams) {
        let socketIndex = socket.quizMaster.teamSockets.findIndex(x => x.team.name === teamName);
        if(socketIndex === -1) {
            let deletedArray = socket.quizMaster.teamSockets.splice(socketIndex, 1);
            rejectedTeamSockets.push(deletedArray[0]);
        }
    }
    rejectedTeamSockets.forEach(s => {
        s.send(JSON.stringify({
            messageType: "REJECTED_QUIZ_STARTED",
            message: "The quiz master decided to start the quiz and you were not invited."
        }));
    });
    socket.quizMaster.teamSockets.forEach(acceptedTeam => {
        acceptedTeam.send(JSON.stringify({
            messageType: "QUIZ_STARTED_APPROVED",
            message: "The quiz master has started the quiz and is now choosing categories for the first round. " +
            "Prepare for some questions coming your way"
        }));
    });
    if(socket.quizMaster.attachedScoreboardSocket) {
        socket.quizMaster.attachedScoreboardSocket.send(JSON.stringify({
            messageType: "ADD_TEAMS",
            message: msg.teams
        }));
        socket.quizMaster.attachedScoreboardSocket.send(JSON.stringify({
            messageType: "START_QUIZ",
            message: "The quiz has started"
        }))
    }
};
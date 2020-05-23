module.exports = function handleApprovalStatus(wss, socket, msg) {
    console.log("MSG APPROVED : ", msg);
    let indexOfTeam = socket.quizMaster.teamSockets.findIndex(x => x.team.name === msg.teamName);
    if(indexOfTeam !== -1) {
        socket.quizMaster.teamSockets[indexOfTeam].team.approved = msg.approved;

        socket.quizMaster.teamSockets[indexOfTeam].send(JSON.stringify({
            messageType: "ANSWER_RESULT",
            isCorrect: msg.approved
        }));

        if(socket.quizMaster.attachedScoreboardSocket) {
            socket.quizMaster.attachedScoreboardSocket.send(JSON.stringify({
                messageType: "APPROVAL_UPDATE",
                message: {
                    teamName: msg.teamName,
                    approved: msg.approved,
                    subtract: msg.subtract
                }
            }));
        }
    }
};
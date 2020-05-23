const { rejectedMsg } = require("../../messageObjects/applyForQuizMessages");

module.exports = function refuseAllApplicants(wss, socket, msg) {
    let teamSockets = [];
    socket.quizMaster.teamSockets.forEach(teamSocket => {
        let indexOfAcceptedTeams = socket.quizMaster.acceptedTeams.indexOf(teamSocket.team.name);
        if(indexOfAcceptedTeams === -1) {
            if(teamSocket.readyState !== 3) {
                teamSocket.team = undefined;
                teamSocket.send(JSON.stringify(rejectedMsg));
            }
        }
        else {
            teamSockets.push(teamSocket);
        }
    });

    socket.quizMaster.teamSockets = teamSockets;
    socket.send(JSON.stringify({messageType: "REFUSE_ALL_APPLICANTS_SUCCESS"}));
    console.log("kekekekek")
};
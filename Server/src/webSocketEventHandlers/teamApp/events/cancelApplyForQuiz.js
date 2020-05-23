const { generateCancelMsg } = require("../../messageObjects/applyForQuizMessages");

module.exports = function cancelApplyForQuiz(webSocketServer, socket, msg) {
    if(socket.team.name === msg.name) {
        let returnMessage = generateCancelMsg(msg.name);

        //remove from teamSockets
        let teamSockets = socket.team.attachedQuizMasterSocket.quizMaster.teamSockets;
        let indexTeamSockets = teamSockets.findIndex(x => x.team.name === socket.team.name);
        if(indexTeamSockets !== -1) {
            socket.team.attachedQuizMasterSocket.quizMaster.teamSockets.splice(indexTeamSockets, 1);
        }

        //remove from acceptedTeams
        let acceptedTeams = socket.team.attachedQuizMasterSocket.quizMaster.acceptedTeams;
        let indexAcceptedTeams = acceptedTeams.indexOf(socket.team.name);
        if(indexAcceptedTeams !== -1) {
            acceptedTeams.splice(indexAcceptedTeams, 1);
        }

        socket.team.attachedQuizMasterSocket.send(JSON.stringify(returnMessage));
        socket.team = undefined;
        if(socket.readyState !== 3) {
            socket.send(JSON.stringify({messageType: "APPLY_CANCEL"}));
        }
    }
};
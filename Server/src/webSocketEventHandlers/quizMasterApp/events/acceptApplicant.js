const {applyAcceptedMsg} = require("../../messageObjects/applyForQuizMessages");

module.exports = function acceptApplicant(wss, socket, msg) {
    wss.clients.forEach(client => {
        if(client.team) {
            if(client.team.name === msg.name) {
                let participant = {name: msg.name, isReady: false};
                socket.quizMaster.acceptedTeams.push(participant.name);
                socket.send(JSON.stringify({messageType: "ACCEPT_APPLICANT_SUCCESS", participant: participant}));
                client.send(JSON.stringify(applyAcceptedMsg));
            }
        }
    });

    if(socket.attachedScoreboardSocket) {
        socket.attachedScoreboardSocket.send(JSON.stringify({
            messageType: "ADD_TEAMS",
            message: msg.teams
        }));
    }
};
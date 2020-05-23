const { rejectedMsg } = require("../../messageObjects/applyForQuizMessages");

module.exports = function refuseApplicant(webSocketServer, socket, msg) {
    let sentMsg = false;
    webSocketServer.clients.forEach(client => {
        if(client.team) {
            if(client.team.name === msg.name) {
                client.send(JSON.stringify(rejectedMsg));
            }
        }
    });

    let indexOfAttachedClient = socket.quizMaster.teamSockets.findIndex(x => x.name === msg.name);
    socket.quizMaster.teamSockets.splice(indexOfAttachedClient, 1);
    socket.send(JSON.stringify({messageType: "REFUSE_APPLICANT_SUCCESS"}));
};
const {removeTeam} = require("../../helperFunctions");

const {kickedMsg,generateKickedSuccessMsg} = require("../../messageObjects/kickedMessage");

module.exports = function kickParticipant(webSocketServer, socket, msg) {
    console.log("KICKPARTICIPANT FUNCTION", generateKickedSuccessMsg(msg.name));
    webSocketServer.clients.forEach(client => {
        if(client.team) {
            if(client.team.name === msg.name) {
                let indexInAcceptedTeams = socket.quizMaster.acceptedTeams.indexOf(msg.name);
                let indexInSocketTeams = socket.quizMaster.teamSockets.findIndex(x => x.team.name === msg.name);
                if(indexInAcceptedTeams !== -1) {
                    socket.quizMaster.acceptedTeams.splice(indexInAcceptedTeams, 1);
                }
                else {
                    throw new Error("Tried to kick a nonexisting participant");
                }

                if(indexInSocketTeams !== -1) {
                    socket.quizMaster.teamSockets.splice(indexInSocketTeams, 1);
                }
                else {
                    throw new Error("Tried to kick but the connection was already broken or never established. (no socket attached to qm)");
                }

                client.team = undefined;

                client.send(JSON.stringify(kickedMsg));
                socket.send(JSON.stringify(generateKickedSuccessMsg(msg.name)));
            }
        }
    })
};
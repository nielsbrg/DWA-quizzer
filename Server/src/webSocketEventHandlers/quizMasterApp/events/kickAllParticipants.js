const {kickedMsg, kickedAllSuccessMsg} = require("../../messageObjects/kickedMessage");

module.exports = function kickAllUsers(wss, socket, msg) {
    socket.quizMaster.teamSockets = [];
    socket.quizMaster.acceptedTeams = [];

    wss.clients.forEach(client => {
        if(client.team) {
            if(msg.names.indexOf(client.team.name) !== -1) {
                client.send(JSON.stringify(kickedMsg));
                client.team = undefined;
            }
        }
    });

    socket.send(JSON.stringify(kickedAllSuccessMsg));
};
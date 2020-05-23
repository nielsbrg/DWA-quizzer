const {applyAcceptedMsg} = require("../../messageObjects/applyForQuizMessages");

module.exports = function acceptAllApplicants(wss, socket, msg) {
    let participants = [];
    let sentMsg = false;
    wss.clients.forEach(client => {
        if(client.team) {
            let indexOfName = msg.applicants.indexOf(client.team.name);
            if(indexOfName !== -1) {
                participants.push({name: msg.applicants[indexOfName], isReady: false});
                socket.quizMaster.acceptedTeams.push(msg.applicants[indexOfName]);
                client.send(JSON.stringify(applyAcceptedMsg));
                sentMsg = true;
            }
        }
    });
    if(!sentMsg) {
        socket.quizMaster.teamSockets = [];
        socket.send(JSON.stringify({messageType: "REFUSE_ALL_APPLICANTS_SUCCESS" }));
    }
    else {
        socket.send(JSON.stringify({messageType: "ACCEPT_ALL_APPLICANTS_SUCCESS", participants: participants}));
    }
};
const {generateNewApplicantMsg, generateNoMatchMsg} = require("../../messageObjects/applyForQuizMessages");
const { nameNotUniqueMsg, applyConnectedMsg, quizAlreadyStartedMsg } = require("../../messageObjects/applyForQuizMessages");

module.exports = function applyForQuiz(webSocketServer, teamAppSocket, msg) {
    let hasSentMsg = false;
    webSocketServer.clients.forEach(currentSocket => {
        if(currentSocket.quizMaster) {
            if(currentSocket.quizMaster.password === msg.password) {
                if(currentSocket.quizMaster.isActive) {
                    teamAppSocket.send(JSON.stringify(quizAlreadyStartedMsg));
                    hasSentMsg = true;
                }
                else if(currentSocket.quizMaster.teamSockets.findIndex(x => x.team.name === msg.name) !== -1) {
                    teamAppSocket.send(JSON.stringify(nameNotUniqueMsg));
                    hasSentMsg = true;
                }
                else if(currentSocket.quizMaster.acceptedTeams.indexOf(msg.name) !== -1) {
                    teamAppSocket.send(JSON.stringify(nameNotUniqueMsg));
                    hasSentMsg = true;
                }
                else {
                    teamAppSocket.team = {
                        name: msg.name,
                        attachedQuizMasterSocket: currentSocket
                    };
                    currentSocket.quizMaster.teamSockets.push(teamAppSocket);
                    //notify team app
                    teamAppSocket.send(JSON.stringify(applyConnectedMsg));
                    //notify quiz master app
                    currentSocket.send(JSON.stringify(generateNewApplicantMsg(msg.name)));
                }
                hasSentMsg = true;
            }
        }
    });
    if(!hasSentMsg) {
        teamAppSocket.send(JSON.stringify(generateNoMatchMsg(msg.password)));
    }
};
const {quizMasterDisconnected } = require("./messageObjects/disconnectedMessages")

function removeTeamFromQuiz(quizMasterSocket, name) {
    const socketIndex = quizMasterSocket.quizMaster.teamSockets.findIndex(x => x.team.name === name);
    if(socketIndex !== -1) {
        quizMasterSocket.quizMaster.teamSockets.splice(socketIndex, 1);
    }
    const teamIndex = quizMasterSocket.quizMaster.acceptedTeams.indexOf(name);
    if(teamIndex !== -1) {
        quizMasterSocket.quizMaster.acceptedTeams.splice(teamIndex, 1);
    }
}

function getQuizMasterFromTeamName(wss, teamName) {
    let quizMasterClient = undefined;
    wss.clients.forEach(client => {
        if(client.quizMaster) {
            console.log("GETQUIZMASTERFROMTEAMNAME: " , client.quizMaster.teamSockets.map(x => x.team.name), teamName, client.quizMaster.teamSockets.findIndex(x => x.team.name === teamName));
            if(client.quizMaster.teamSockets.findIndex(x => x.team.name === teamName) !== -1) {
                console.log("HALLO");
                quizMasterClient = client;
            }
            else if(client.quizMaster.acceptedTeams.indexOf(teamName) === -1) {
                quizMasterClient = client;
            }
        }
    });
    return quizMasterClient;
}

function updateAndNotifyTeamsQuizMasterDC(wss, qmName, teams) {
    wss.clients.forEach(client => {
        if(client.team) {
            if(client.team.attachedQuizMasterSocket.quizMaster.name === qmName) {
                teams.delete(client.team.name);
                client.team = undefined;
                client.send(JSON.stringify(quizMasterDisconnected));
            }
        }
    });
}

module.exports = {
    removeTeam: removeTeamFromQuiz,
    getQuizMasterFromTeamName: getQuizMasterFromTeamName,
    updateAndNotifyTeamsQuizMasterDC: updateAndNotifyTeamsQuizMasterDC
};
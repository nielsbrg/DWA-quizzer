const {removeTeam, updateAndNotifyTeamsQuizMasterDC, getQuizMasterFromTeamName, updateTeamsQuizMasterConnection } = require("./helperFunctions");
const { generateTeamDisconnectedMsg } = require("./messageObjects/disconnectedMessages");

module.exports = function handleCloseWebSocket(wss, quizMasters, teams) {
    let checkedTeams = new Set();
    let checkedQuizMasters = new Set();
    wss.clients.forEach(client => {
        if(client.team) {
            checkedTeams.add(client.team.name);
        }
        else if(client.quizMaster) {
            checkedQuizMasters.add(client.quizMaster.name);
        }
    });
    let disconnectedTeams = getDifference(teams, checkedTeams);
    let disconnectedQuizMasters = getDifference(quizMasters, checkedQuizMasters);

    console.log("DISCONNECTED TEAMS", disconnectedTeams);
    console.log("DISCONNECTED QUIZ MASTERS: ", disconnectedQuizMasters);

    disconnectedTeams.forEach(teamName => {
        const quizMasterSocket = getQuizMasterFromTeamName(wss,teamName);
        if(quizMasterSocket) {
            removeTeam(quizMasterSocket, teamName);
            quizMasterSocket.send(JSON.stringify(generateTeamDisconnectedMsg(teamName)));
            teams.delete(teamName);
        }
    });
    disconnectedQuizMasters.forEach(qmName => {
        updateAndNotifyTeamsQuizMasterDC(wss, qmName, teams);
        quizMasters.delete(qmName);
    });
};

function getDifference(set1, set2) {
    return new Set([...set1].filter(x => !set2.has(x)));
}
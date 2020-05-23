const introductionQuizMasterMsg = require("../../messageObjects/introductionQuizMaster");

module.exports = function introductionQuizMaster(socket, msg) {
    socket.quizMaster = {
        name: msg.name,
        password: msg.password,
        teamSockets: [],
        acceptedTeams: [],
        isActive: false
    };
    socket.send(JSON.stringify(introductionQuizMasterMsg));
};

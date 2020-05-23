const { generateReadyChangeObj } = require("../../messageObjects/toggleReadyState");

module.exports = function toggleReadyState(wss, socket, msg) {
    socket.team.attachedQuizMasterSocket.send(JSON.stringify({
        messageType: "TOGGLE_READYSTATE_OK",
        participant: {name: msg.name, isReady: msg.isReady}
    }));
    socket.send(JSON.stringify({
        messageType: "TOGGLE_READYSTATE_OK",
        isReady: msg.isReady
    }));
};
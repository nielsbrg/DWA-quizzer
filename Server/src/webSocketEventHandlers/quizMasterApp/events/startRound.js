const { startRoundMsg } = require("../../messageObjects/roundMessages");

module.exports = function startRoundNotify(wss, socket, msg) {
    socket.quizMaster.teamSockets.forEach(client => {
        client.send(JSON.stringify({
            messageType: "START_ROUND_NOTIFY",
            message: "The quiz master has started a new round and is now selecting categories for it."
        }))
    });
    if(socket.quizMaster.attachedScoreboardSocket) {
        socket.quizMaster.attachedScoreboardSocket.send(JSON.stringify({messageType: "START_ROUND"}))
    }
};
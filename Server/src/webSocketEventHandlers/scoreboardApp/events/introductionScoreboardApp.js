module.exports = function introductionScoreboardApp(wss, socket, msg) {
    let hasSentMsg = false;
    wss.clients.forEach(client => {
        if(client.quizMaster) {
            console.log("SCOREBOARD PASS: " + msg.password);
            console.log("QUIZMASTER PASS: " + client.quizMaster.password);
            if(client.quizMaster.password === msg.password) {
                client.quizMaster.attachedScoreboardSocket = socket;
                let message = "The scoreboard is now connected to the quiz master."
                if(!client.quizMaster.isActive) {
                    message += " Waiting for new information..";
                }
                socket.send(JSON.stringify({messageType: "INTRODUCTION_SCOREBOARD_SUCCESS", message: message}));
               hasSentMsg = true;
            }
        }
    });
    if(!hasSentMsg) {
        socket.send(JSON.stringify({messageType: "INTRODUCTION_SCOREBOARD_FAILED_NOT_FOUND"}));
    }
};
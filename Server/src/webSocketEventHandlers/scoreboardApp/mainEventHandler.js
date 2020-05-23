const introductionScoreboardApp = require("./events/introductionScoreboardApp");

module.exports = function handleScoreboardAppEvents(webSocketServer, socket, msg) {
    switch(msg.messageType) {
        case "INTRODUCTION_SCOREBOARD": {
            introductionScoreboardApp(webSocketServer, socket, msg);
            break;
        }
    }
};
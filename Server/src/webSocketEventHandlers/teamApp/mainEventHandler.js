const applyForQuiz = require("./events/applyForQuiz");
const cancelApplyForQuiz = require("./events/cancelApplyForQuiz");
const toggleReadyState = require("./events/toggleReadyState");
const submitAnswer = require("./events/submitAnswer");

module.exports = function handleTeamAppEvents(webSocketServer, socket, msg) {
    switch(msg.messageType) {
        case "APPLY": {
            applyForQuiz(webSocketServer, socket, msg);
            break;
        }
        case "CANCEL_APPLY": {
            cancelApplyForQuiz(webSocketServer, socket, msg);
            break;
        }
        case "TOGGLE_READYSTATE": {
            toggleReadyState(webSocketServer, socket, msg);
            break;
        }
        case "SUBMIT_ANSWER": {
            submitAnswer(webSocketServer, socket, msg);
            break;
        }
    }
};
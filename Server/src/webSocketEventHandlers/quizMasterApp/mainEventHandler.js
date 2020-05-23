const introductionQuizMaster = require("./events/introductionQuizMaster");
const acceptApplicant = require("./events/acceptApplicant");
const refuseApplicant = require("./events/refuseApplicant");
const kickParticipant = require("./events/kickParticipant");
const kickAllParticipants = require("./events/kickAllParticipants");
const acceptAllApplicants = require("./events/acceptAllApplicants");
const refuseAllApplicants = require("./events/refuseAllApplicants");
const startRound = require("./events/startRound");
const quizHasStarted = require("./events/quizHasStarted");
const startRoundSelectQuestion = require("./events/startRoundSelectQuestion");
const startQuestionNotify = require("./events/startQuestionNotify");
const closeQuestion = require("./events/closeQuestion");
const handleApprovalStatus = require("./events/answerApproval");
const startNewQuestion = require("./events/startNewQuestion");
const endQuiz = require("./events/endQuiz");
const startRoundFulfilled = require("./events/startRoundFulfilled");
const sendRoundResults = require("./events/sendRoundResults");

module.exports = function handleEvents(webSocketServer, socket, msg) {
    switch(msg.messageType) {
        case "INTRODUCTION_QUIZMASTER": {
            introductionQuizMaster(socket, msg);
            break;
        }
        case "ACCEPT_APPLICANT": {
            acceptApplicant(webSocketServer, socket, msg);
            break;
        }
        case "REFUSE_APPLICANT": {
            refuseApplicant(webSocketServer, socket, msg);
            break;
        }
        case "KICK_USER": {
            kickParticipant(webSocketServer, socket, msg);
            break;
        }
        case "KICK_ALL_USERS": {
            kickAllParticipants(webSocketServer, socket, msg);
            break;
        }
        case "ACCEPT_ALL_APPLICANTS": {
            acceptAllApplicants(webSocketServer, socket, msg);
            break;
        }
        case "REFUSE_ALL_APPLICANTS": {
            refuseAllApplicants(webSocketServer, socket, msg);
            break;
        }
        case "QUIZ_HAS_STARTED": {
            quizHasStarted(webSocketServer, socket, msg);
            break;
        }
        case "START_ROUND_NOTIFY": {
            startRound(webSocketServer, socket, msg);
            break;
        }
        case "START_ROUND_SELECT_QUESTION": {
            startRoundSelectQuestion(webSocketServer, socket, msg);
            break;
        }
        case "START_ROUND_FULFILLED": {
            startRoundFulfilled(webSocketServer, socket, msg);
            break;
        }
        case "START_QUESTION_NOTIFY": {
            startQuestionNotify(webSocketServer, socket, msg);
            break;
        }
        case "START_NEW_QUESTION": {
            startNewQuestion(webSocketServer, socket, msg);
            break;
        }
        case "CLOSE_QUESTION": {
            closeQuestion(webSocketServer, socket, msg);
            break;
        }
        case "QUIZ_MASTER_ENDED_QUIZ": {
            endQuiz(webSocketServer, socket, msg);
            break;
        }
        case "APPROVE_ANSWER": {
            handleApprovalStatus(webSocketServer, socket, msg);
            break;
        }
        case "DISAPPROVE_ANSWER": {
            handleApprovalStatus(webSocketServer, socket, msg);
            break;
        }
        case "SEND_ROUND_RESULTS": {
            sendRoundResults(webSocketServer, socket, msg);
            break;
        }
    }
};
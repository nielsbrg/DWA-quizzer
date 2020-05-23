const rejected = {
    messageType: "APPLY_REJECTED",
        message: "You were rejected from joining the quiz by the quiz master."
};

const applyConnected = {
    messageType: "APPLY_CONNECTED",
    message: "Joined the quiz. Waiting for the quiz master to process your request."
};

const applyAccepted = {
    messageType: "APPLY_ACCEPTED",
    message: "You have been accepted by the quiz master. Waiting for quiz master to start the quiz.",
};

const applyNameNotUnique = {
    messageType: "APPLY_FAILURE_NAME_NOT_UNIQUE",
    message: "There is already someone there with the same name. Consider choosing a different name."
};

const quizAlreadyStartedMsg = {
    messageType: "APPLY_FAILURE_QUIZ_ALREADY_STARTED",
    message: "Cannot join a quiz when it is in progress."
};

const generateCancelMsg = (name) => {
    return {
        messageType: "APPLICANT_CANCEL",
        name: name
    }
};

const generateNewApplicantMsg = (name) => {
    return {
        messageType: "NEW_APPLICANT",
        applicant: {name: name}
    }
};

const generateNoMatchMsg = (password) => {
    return {
        messageType: "APPLY_FAILED_NOMATCH",
        message: "There were no quizzes with password '" + password + "'."
    }
};

module.exports = {
    rejectedMsg: rejected,
    applyConnectedMsg: applyConnected,
    applyAcceptedMsg: applyAccepted,
    nameNotUniqueMsg: applyNameNotUnique,
    quizAlreadyStartedMsg: quizAlreadyStartedMsg,
    generateNewApplicantMsg,
    generateNoMatchMsg,
    generateCancelMsg
};
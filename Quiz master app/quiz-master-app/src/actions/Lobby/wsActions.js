export default function dispatchBasedOnMessage(body) {
    switch(body.messageType) {
        case "NEW_APPLICANT": return { type: "ADD_APPLICANT", payload: body.applicant.name };
        case "APPLICANT_CANCEL":  return { type: body.messageType, payload: body.name };
        case "ACCEPT_APPLICANT_SUCCESS": return { type: "ACCEPT_APPLICANT", payload: body.participant };
        case "ACCEPT_APPLICANT_FAILURE": return passOnMessage(body);
        case "ACCEPT_APPLICANT_FAILURE_NAME_NOT_UNIQUE": return passOnMessage(body);
        case "INTRODUCTION_QUIZMASTER": return passOnMessage(body);
        case "KICK_USER_SUCCESS": return {type: body.messageType, payload: body.name};
        case "KICK_ALL_USERS_SUCCESS": return passOnMessage(body);
        case "REFUSE_APPLICANT_SUCCESS": return passOnMessage(body);
        case "ACCEPT_ALL_APPLICANTS_SUCCESS": return { type: body.messageType, payload: body.participants};
        case "REFUSE_ALL_APPLICANTS_SUCCESS": return passOnMessage(body);
        case "TOGGLE_READYSTATE_OK": return { type: body.messageType, payload: body.participant };
        case "TEAM_DISCONNECTED": return {type: body.messageType, payload: body.name};
        case "QUIZ_MASTER_ENDED_QUIZ_SUCCESS": return {type: body.messageType, payload: body.message};
        case "TEAM_ANSWERED": {
            return {type: body.messageType, payload: body.teamName};
        }
        case "CLOSE_QUESTION_SUCCESS": {
            return {type: body.messageType, payload: body.answers}
        }
        default: return {
            type: "UNKNOWN",
            payload: ""
        };
    }
}

function passOnMessage(body) {
    return {
        type: body.messageType,
        payload: ""
    }
}
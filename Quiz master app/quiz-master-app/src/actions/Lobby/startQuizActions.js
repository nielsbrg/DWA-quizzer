import request from 'superagent'

export function notAllTeamsReady() {
    return {
        type: "START_QUIZ_NOT_ALL_TEAMS_READY",
        payload: ""
    }
}

export function cancelNotReadyModal() {
    return {
        type: "CANCEL_NOT_READY_MODAL",
    }
}

export function startQuizNoTeams() {
    return {
        type: "START_QUIZ_NO_TEAMS",
        payload: "Cannot start a quiz with no teams!"
    }
}

export function startQuizNotAllReady() {
    return {
        type: "START_QUIZ_NOT_ALL_TEAMS_READY_AFTER_WARNING",
    }
}

export function updateStartQuizAfterModalWarning() {
    return {
        type: "STARTED_QUIZ_NOT_ALL_TEAMS_READY"
    }
}

export function setTeamsForQuiz(quizId, teams) {
    return {
        type: "SET_TEAMS",
        payload: request("POST", `http://localhost:8080/quizzes/${quizId}/teams`).send(teams)
    }
}

export function quizHasStarted() {
    return {
        type: "QUIZ_HAS_STARTED"
    }
}
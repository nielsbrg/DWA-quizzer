import request from 'superagent'

export function verifyPassword(pw) {
    return {
        type: "VERIFY_PASSWORD",
        payload: request("POST", `http://localhost:8080/quizzes`)
            .send({password: pw})
            .query({verify: true})
    }
}

export function startVerifyPassword() {
    return {
        type: "START_VERIFY_PASSWORD",
    }
}
export function endVerifyPassword() {
    return {
        type: "END_VERIFY_PASSWORD"
    }
}

export function getRoundDataForQuiz(quizId) {
    return {
        type: "GET_ROUND_DATA",
        payload: request("GET", `http://localhost:8080/quizzes/${quizId}/rounds`)
    }
}

export function noQuizFound(message) {
    return {
        type: "NO_QUIZ_FOUND",
        payload: message
    }
}
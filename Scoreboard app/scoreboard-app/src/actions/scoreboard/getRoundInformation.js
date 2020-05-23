import request from 'superagent'

export function getRoundInformation(quizId) {
    return {
        type: "FETCH_ROUND_INFORMATION",
        payload: request("GET", `http://localhost:8080/quizzes/${quizId}/rounds`)
    }
}
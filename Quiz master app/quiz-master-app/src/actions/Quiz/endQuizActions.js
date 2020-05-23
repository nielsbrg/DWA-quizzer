import request from 'superagent'

export function deleteAllQuizData(quizId) {
    return {
        type: "DELETE_ALL_QUIZ_DATA",
        payload: request("DELETE", `http://localhost:8080/quizzes/${quizId}`)
    }
}

export function setQuizToInactive(quizId) {
    return {
        type: "SET_QUIZ_INACTIVE",
        payload: request("PUT", `http://localhost:8080/quizzes/${quizId}`)
    }
}
import request from 'superagent'

export function goForward() {
    return {
        type: "QUESTION_SELECTOR_FORWARD",
    }
}

export function goBackward() {
    return {
        type: "QUESTION_SELECTOR_BACKWARD"
    }
}

export function endReached() {
    return {
        type: "QUESTION_SELECTOR_END_REACHED",
        payload: "Cannot go further. This is the last category"
    }
}

export function beginningReached() {
    return {
        type: "QUESTION_SELECTOR_BEGINNING_REACHED",
        payload: "Cannot go back further. This is the first category"
    }
}

export function selectQuestion(questionObj) {
    return {
        type: "SELECT_QUESTION",
        payload: questionObj
    }
}

export function startQuestionNothingSelected() {
    return {
        type: "START_QUESTION_NOTHING_SELECTED",
        payload: "Cannot start question when there is nothing selected."
    }
}

export function submitQuestionToQuiz(quizId, roundNr, question) {
    return {
        type: "SUBMIT_QUESTION_FOR_ROUND",
        payload: request("POST", `http://localhost:8080/quizzes/${quizId}/rounds/${parseInt(roundNr)}/questions`)
            .send({
                _id: question._id,
                question: question.question,
                category: question.category
            })
    }
}
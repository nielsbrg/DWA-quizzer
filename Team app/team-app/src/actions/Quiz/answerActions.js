export function updateAnswer(answerValue) {
    return {
        type: "UPDATE_ANSWER_VALUE",
        payload: answerValue
    }
}
export function submitEmptyAnswer() {
    return {
        type: "SUBMIT_EMPTY_ANSWER",
        payload: "Cannot submit empty answer."
    }
}
export function changeAnswer() {
    return {
        type: "CHANGE_ANSWER",
    }
}
export function changeAppTitle(newTitle) {
    return {
        type: "CHANGE_TITLE",
        payload: newTitle
    }
}

export function clearErrors() {
    return {
        type: "CLEAR_ERRORS"
    }
}

export function populateErrMsg(msg) {
    return {
        type: "POPULATE_ERR_MSG",
        payload: msg
    }
}

export function populateSuccessMsg(msg) {
    return {
        type: "POPULATE_SUCCESS_MSG",
        payload: msg
    }
}

export function saveQuizObj(quiz) {
    return {
        type: "SAVE_QUIZ",
        payload: quiz
    }
}
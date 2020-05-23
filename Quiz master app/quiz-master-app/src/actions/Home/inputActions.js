import request from 'superagent'

export function changeQuizMasterName(nameField) {
    return {
        type: "CHANGE_QUIZMASTERNAME",
        payload: {
            value: nameField.value,
            touched: nameField.touched
        }
    }
}

export function changePassword(passwordField) {
    return {
        type: "CHANGE_PASSWORD",
        payload: {
            value: passwordField.value,
            touched: passwordField.touched
        }
    }
}

export function changeNameTouched(obj) {
    return {
        type: "CHANGE_QUIZMASTERNAME_TOUCHED",
        payload: {
            touched: obj.touched
        }
    }
}

export function changePasswordTouched(obj) {
    return {
        type: "CHANGE_PASSWORD_TOUCHED",
        payload: {
            touched: obj.touched
        }
    }
}

export function registerQuizInvalid(timesSubmitted) {
    return {
        type: "REGISTER_NEWQUIZ_FAILED",
        payload: timesSubmitted
    }
}

export function createNewQuiz(name, password) {
    return {
        type: "NEWQUIZ",
        payload: request("POST", "http://localhost:8080/quizzes").send({name: name, password: password})
    }
}
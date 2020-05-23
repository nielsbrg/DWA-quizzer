changeTeamName, changeNameTouched, changePassword, changePasswordTouched

export function changeTeamName(nameField) {
    return {
        type: "CHANGE_NAME",
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
        type: "CHANGE_NAME_TOUCHED",
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

export function onSubmitEmptyName() {
    return {
        type: "ONSUBMIT_NONAME",
        payload: "Cannot join quiz with empty name!"
    }
}

export function onSubmitEmptyPassword() {
    return {
        type: "ONSUBMIT_NOPASSWORD",
        payload: "A password is required to join. Ask your quiz master for the password."
    }
}

export function onSubmit(timesSubmitted) {
    return {
        type: "ONSUBMIT",
        payload: timesSubmitted + 1
    }
}

export function startApplyForQuiz() {
    return {
        type: "START_APPLY",
        payload: "Verifying..."
    }
}

export function clearErrors() {
    return {
        type: "CLEAR_ERRORS",
    }
}

export function startWaiting() {
    return {
        type: "START_WAITING"
    }
}
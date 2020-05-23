export function changePasswordTouched(bool) {
    return {
        type: "CHANGE_PASSWORD_TOUCHED",
        payload: bool
    }
}

export function changePassword(value) {
    return {
        type: "CHANGE_PASSWORD",
        payload: value
    }
}

export function submitEmptyPassword() {
    return {
        type: "SUBMIT_EMPTY_PASSWORD",
        payload: "Password is a required field."
    }
}

export function clearErrors() {
    return {
        type: "CLEAR_ERRORS",
    }
}
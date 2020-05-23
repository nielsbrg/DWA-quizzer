const initialState = {
    nameField: {
        value: "",
        touched: false
    },
    passwordField: {
        value: "",
        touched: false
    },
    timesSubmitted: 0,
    validationErrors: [],
    shouldCloseWs: false
};

export default function homeReducer(state=initialState, action) {
    switch(action.type) {
        case "CHANGE_NAME": {
            return {...state, nameField: { value: action.payload.value, touched: action.payload.touched }};
        }
        case "CHANGE_NAME_TOUCHED": {
            return {...state, nameField: { value: state.nameField.value, touched: action.payload.touched}}
        }
        case "CHANGE_PASSWORD_TOUCHED": {
            return {...state, passwordField: { value: state.passwordField.value, touched: action.payload.touched}}
        }
        case "CHANGE_PASSWORD": {
            return {...state, passwordField: { value: action.payload.value, touched: action.payload.touched } };
        }
        case "CLEAR_ERRORS": return {...state, validationErrors: []};
        case "APPLY_FAILED_NOMATCH": return {...state, validationErrors: [...state.validationErrors, action.payload]};
        case "APPLY_REJECTED": {
            return {...state, validationErrors: [action.payload] }
        }
        case "APPLY_FAILURE_NAME_NOT_UNIQUE": {
            return {...state, validationErrors: [...state.validationErrors, action.payload]}
        }
        case "APPLY_FAILURE_QUIZ_ALREADY_STARTED": {
            return {...state, validationErrors: [...state.validationErrors, action.payload]}
        }
        case "WS_ERROR": {
            return {...state, validationErrors: [...state.validationErrors, action.payload]}
        }
        case "WS_CLOSE": {
            return {...state, validationErrors: [...state.validationErrors, action.payload]}
        }
        case "KICKED": {
            return {...state, validationErrors: [action.payload]};
        }
        case "QUIZ_MASTER_DISCONNECTED": {
            return {...state, validationErrors: [...state.validationErrors, action.payload]}
        }
        case "QUIZ_MASTER_ENDED_QUIZ": {
            return {...initialState, validationErrors: [action.payload], shouldCloseWs: true};
        }
        case "SHOULD_CLOSE_WS": {
            return {...state, shouldCloseWs: action.payload}
        }
        case "ONSUBMIT_NONAME" : return getNewValidationErrors(state, action);
        case "ONSUBMIT_NOPASSWORD": return getNewValidationErrors(state, action);
        case "ONSUBMIT": return {...state, timesSubmitted: action.payload};
        case "REJECTED_QUIZ_STARTED": {
            return {...state, validationErrors: [...state.validationErrors, action.payload]}
        }
        default: return state;
    }
}

function getNewValidationErrors(state, action) {
    const validationErrors = [...state.validationErrors];
    if(validationErrors.length === 0) {
        return {...state, validationErrors: [action.payload]}
    }
    if(validationErrors.indexOf(action.payload) === -1) {
        validationErrors.push(action.payload);
    }
    return {...state, validationErrors: validationErrors}
}
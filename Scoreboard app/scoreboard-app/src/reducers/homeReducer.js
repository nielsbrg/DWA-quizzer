const initialState = {
    validationErrors: [],
    passwordField: {
        value: "",
        touched: false
    },
    isLoading: false,
    isVerifying: false
};

export default function homeReducer(state=initialState, action) {
    switch(action.type) {
        case "CHANGE_PASSWORD_TOUCHED": {
            return {...state, passwordField: { value: state.passwordField.value, touched: action.payload}}
        }
        case "CHANGE_PASSWORD": {
            return {...state, passwordField: { value: action.payload, touched: state.passwordField.touched } };
        }
        case "START_VERIFY_PASSWORD": return {...state, isVerifying: true};
        case "END_VERIFY_PASSWORD": return {...state, isVerifying: false};
        case "VERIFY_PASSWORD_PENDING": return setLoading(state, true);
        case "VERIFY_PASSWORD_REJECTED": return setLoading(state, false);
        case "VERIFY_PASSWORD_FULFILLED": return setLoading(state, false);
        case "WS_START": return setLoading(state, true);
        case "WS_OPEN": return setLoading(state, false);
        case "WS_ERROR": return setLoading(state, false, "Something went wrong connecting to the server.");
        case "WS_CLOSE": return setLoading(state, false);
        case "CLEAR_ERRORS": return clearErrors(state);
        case "NO_QUIZ_FOUND": return addError(state, action);
        case "SUBMIT_EMPTY_PASSWORD": return addError(state, action);
        default: return state;
    }
}

function addError(state, action) {
    return {...state, validationErrors: [...state.validationErrors, action.payload]}
}
function clearErrors(state) {
    return {...state, validationErrors: []}
}
function setLoading(state, bool, msg) {
    if(msg) {
        return {...state, isLoading: bool, validationErrors: [...state.validationErrors, msg]};
    }
    return {...state, isLoading: bool}
}
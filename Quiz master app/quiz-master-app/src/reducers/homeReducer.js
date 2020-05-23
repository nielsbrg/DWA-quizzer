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
    quizLoadErr: undefined,
    quizLoadErrMsg: "",
    quizLoadSuccessMsg: "",
    quizEndMsg: "",
    isLoading: false,
    isWaiting: false
};
export default function homeReducer(state=initialState, action) {
    switch(action.type) {
        case "CHANGE_QUIZMASTERNAME": {
            return {...state, nameField: { value: action.payload.value, touched: action.payload.touched }};
        }
        case "CHANGE_QUIZMASTERNAME_TOUCHED": {
            return {...state, nameField: { value: state.nameField.value, touched: action.payload.touched}}
        }
        case "CHANGE_PASSWORD_TOUCHED": {
            return {...state, passwordField: { value: state.passwordField.value, touched: action.payload.touched}}
        }
        case "CHANGE_PASSWORD": {
            return {...state, passwordField: { value: action.payload.value, touched: action.payload.touched } };
        }
        case "REGISTER_NEWQUIZ": return {...state, title: action.payload.title};

        case "REGISTER_NEWQUIZ_FAILED": return {...state, timesSubmitted: action.payload + 1};

        case "NEWQUIZ_PENDING": return {...state, isLoading: true, quizLoadErrMsg: "", quizLoadErr: undefined, quizEndMsg: ""};

        case "NEWQUIZ_FULFILLED": return {...state, isLoading: false};

        case "NEWQUIZ_REJECTED": {
            if(action.payload.response) {
                return {...state, quizLoadErr: action.payload.response.body, isLoading: false};
            }
            else {
                return {...state, quizLoadErrMsg: "Tried to create a quiz but did not get a response from the server. Maybe it is offline?", isLoading: false}
            }
        }
        case "POPULATE_ERR_MSG": return {...state, quizLoadErrMsg: action.payload};

        case "POPULATE_SUCCESS_MSG": return {...state, quizLoadSuccessMsg: action.payload, isWaiting: true};

        case "QUIZ_MASTER_ENDED_QUIZ_SUCCESS": return {
            ...initialState,
            quizEndMsg: action.payload,
            nameField: {touched: false, value: state.nameField.value},
            passwordField: { touched: false, value: state.passwordField.value}
        };

        default: return state;
    }
}
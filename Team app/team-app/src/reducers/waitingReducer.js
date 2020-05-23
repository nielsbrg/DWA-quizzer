const initialState = {
    currentMsg: "",
    isAccepted: false,
    isConnected: false,
    isReady: false,
    showHome: false,
    showQuiz: false,
    isLoading: true,
    quizStarted: false,
    isAnswerCorrect: undefined
};

export default function waitingReducer(state=initialState, action) {
    switch(action.type) {
        case "START_WAITING": {
            return initialState;
        }
        case "APPLY_CONNECTED": {
            return {...state, currentMsg: action.payload, isLoading: false, isConnected: true, showHome: false}
        }
        case "TOGGLE_READYSTATE_OK": {
            return {...state, isReady: action.payload}
        }
        case "APPLY_ACCEPTED": {
            return {...state, currentMsg: action.payload, isLoading: false, isAccepted: true}
        }
        case "APPLY_FAILURE_QUIZ_ALREADY_STARTED": {
            return {...state, isLoading: false, isAccepted: false, showHome: true}
        }
        case "QUIZ_STARTED_APPROVED": {
            return {...state, currentMsg: action.payload, quizStarted: true}
        }
        case "START_ROUND_SELECT_QUESTION": {
            return {...state, currentMsg: action.payload, isAnswerCorrect: undefined}
        }
        case "START_ROUND_NOTIFY": {
            return {...state, currentMsg: action.payload, isAnswerCorrect: undefined}
        }
        case "APPLY_CANCEL": return {...state, isReady: false, isAccepted: false, showHome: true, currentMsg: ""};
        case "START_NEW_QUESTION": {
            return {...state, showQuiz: true, isAnswerCorrect: undefined}
        }
        case "CLOSE_QUESTION": {
            return {...state, showQuiz: false, currentMsg: action.payload}
        }
        case "ANSWER_RESULT": {
            return {...state, isAnswerCorrect: action.payload}
        }
        case "START_NEXT_QUESTION_IN_ROUND": {
            return {...state, currentMsg: action.payload, isAnswerCorrect:undefined}
        }
        case "QUIZ_MASTER_ENDED_QUIZ": {
            return {...state, showHome: true, showQuiz: false, quizStarted: false, isConnected: false, isAccepted: false};
        }
        case "APPLY_FAILURE_NAME_NOT_UNIQUE": return showHome(state);
        case "APPLY_FAILED_NOMATCH": return showHome(state);
        case "APPLY_REJECTED": return showHome(state);
        case "WS_CLOSE": return showHome(state);
        case "WS_ERROR": return showHome(state);
        case "KICKED": return showHome(state);
        case "QUIZ_MASTER_DISCONNECTED": return showHome(state);
        case "REJECTED_QUIZ_STARTED": return showHome(state);

        default: return state;
    }
}

function showHome(state) {
    return {...state, showHome: true, isLoading: false}
}
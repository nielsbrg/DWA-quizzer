const initialState = {
    currentQuestion: "",
    answer: "",
    validationErrors: [],
    answeredSuccess: "",
    hasAnswered: false,
    timesAnswered: 0,
    questionClosed: false
};

export default function quizReducer(state=initialState, action) {
    switch(action.type) {
        case "START_NEW_QUESTION": {
            return {...initialState, currentQuestion: action.payload}
        }
        case "UPDATE_ANSWER_VALUE": {
            return {...state, answer: action.payload}
        }
        case "SUBMIT_EMPTY_ANSWER": {
            return {...state, validationErrors: [...state.validationErrors, action.payload]}
        }
        case "CLEAR_ERRORS": {
            return {...state, validationErrors: []}
        }
        case "ANSWER_REGISTERED": {
            return {...state, answeredSuccess: action.payload, hasAnswered: true, timesAnswered: state.timesAnswered + 1}
        }
        case "CHANGE_ANSWER": {
            return {...state, hasAnswered: false}
        }
        case "CLOSE_QUESTION": {
            return {...state, questionClosed: true}
        }
        case "QUIZ_MASTER_ENDED_QUIZ": return initialState;

        default: return state;
    }
}
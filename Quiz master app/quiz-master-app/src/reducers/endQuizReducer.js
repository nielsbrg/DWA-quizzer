const initialState = {
    hasEndedQuiz: false
};
export default function endQuizReducer(state=initialState, action) {
    switch(action.type) {
        case "HAS_ENDED_QUIZ": {
            return {...state, hasEndedQuiz: action.payload}
        }
        case "CANCEL_END_QUIZ": {
            return {...state, hasEndedQuiz: false}
        }
        case "QUIZ_MASTER_ENDED_QUIZ_SUCCESS": return initialState;

        default: return state;
    }
};
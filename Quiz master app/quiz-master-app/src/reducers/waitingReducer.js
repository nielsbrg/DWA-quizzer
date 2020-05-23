const initialState = {
    teamsAnswered: new Set(),
    showQuestionResults: false
};

export default function waitingReducer(state=initialState, action) {
    switch(action.type) {
        case "TEAM_ANSWERED": {
            let teamsAnswered = new Set([...state.teamsAnswered]);
            teamsAnswered.add(action.payload);
            return {...state, teamsAnswered: teamsAnswered};
        }
        case "CLOSE_QUESTION_SUCCESS": {
            return {...state, showQuestionResults: true}
        }
        case "RECORD_QUESTION_RESULTS_FULFILLED": {
            return initialState;
        }
        case "QUIZ_MASTER_ENDED_QUIZ_SUCCESS": return initialState;

        default: return state;
    }
}
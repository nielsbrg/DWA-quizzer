const initialState = {
    teamAnswers: [],
    validationErrors: [],
    showEndRoundModal: false
};

export default function answerReducer(state=initialState, action) {
    switch(action.type) {
        case "CLOSE_QUESTION_SUCCESS": {
            return {...state, teamAnswers: action.payload}
        }
        case "CLEAR_ERRORS": {
            return {...state, validationErrors: []};
        }
        case "NEXT_QUESTION_UNAPPROVED": {
            return {...state, validationErrors: [...state.validationErrors, action.payload]};
        }
        case "SHOW_END_ROUND_MODAL": {
            return {...state, showEndRoundModal: action.payload}
        }
        case "QUIZ_MASTER_ENDED_QUIZ_SUCCESS": return initialState;
        case "APPROVE_ANSWER": return getNewApprovalsList(state, action);
        case "DISAPPROVE_ANSWER": return getNewApprovalsList(state, action);

        default: return state;
    }
}

function getNewApprovalsList(state, action) {
    let teamAnswers = [...state.teamAnswers];
    let index = teamAnswers.findIndex(x => x.teamName === action.payload.teamName);
    if(index === -1) {
        teamAnswers.push(action.payload);
    }
    else {
        teamAnswers[index].approved = action.type.split("_")[0] === "DISAPPROVE" ? false : true;
    }
    return {...state, teamAnswers: teamAnswers};
}
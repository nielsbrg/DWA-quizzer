const initialState = {
    validationErrors: [],
    isLoading: true,
    questionsPerCategory: [],
    currentCategoryIndex: 0,
    selectedQuestion: {}
};

export default function selectQuestionReducer(state=initialState, action) {
    switch(action.type) {
        case "FETCH_QUESTIONS_FAILED": {
            return {...state, validationErrors: [...state.validationErrors, action.payload], isLoading: false}
        }
        case "CLEAR_ERRORS": {
            return {...state, validationErrors: []}
        }
        case "STORE_SUGGESTED_QUESTIONS": {
            return {...state, questionsPerCategory: action.payload, currentCategoryIndex: 1, isLoading: false}
        }
        case "QUESTION_SELECTOR_BACKWARD": {
            return {...state, currentCategoryIndex: state.currentCategoryIndex - 1}
        }
        case "QUESTION_SELECTOR_FORWARD": {
            return {...state, currentCategoryIndex: state.currentCategoryIndex + 1}
        }
        case "SELECT_QUESTION": {
            return {...state, selectedQuestion: action.payload}
        }
        case "SET_QUESTION_NR": {
            return {...state, selectedQuestion: {}}
        }
        case "QUESTION_SELECTOR_BEGINNING_REACHED": return addError(state, action);
        case "QUESTION_SELECTOR_END_REACHED": return addError(state, action);
        case "START_QUESTION_NOTHING_SELECTED": return addError(state, action);
        case "QUIZ_MASTER_ENDED_QUIZ_SUCCESS": return initialState;

        default: return state;
    }
}

function addError(state, action) {
    return {...state, validationErrors: [...state.validationErrors, action.payload]};
}
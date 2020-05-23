const initialState = {
    MAX_CATEGORIES_PER_ROUND: 3,
    MAX_QUESTIONS_PER_ROUND: 12,
    MAX_QUESTION_SUGGESTIONS_PER_CATEGORY: 5
};

export default function quizSettingsReducer(state=initialState, action) {
    switch(action.type) {
        default: return state;
    }
}
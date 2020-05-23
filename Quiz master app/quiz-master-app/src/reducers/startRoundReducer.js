const initialState = {
    isLoading: false,
    clickedCategories: new Set(),
    validationErrors: []
};

export function startRoundReducer(state=initialState, action) {
    switch(action.type) {
        case "FETCH_CATEGORIES_PENDING": {
            return {...state, isLoading: true}
        }
        case "FETCH_CATEGORIES_REJECTED": {
            return {...state, isLoading: false}
        }
        case "FETCH_CATEGORIES_FULFILLED": {
            return {...state, isLoading: false}
        }
        case "CLICK_CATEGORY": {
            let clickedCategories = new Set([...state.clickedCategories]);
            if(clickedCategories.size >= action.payload.MAX_CATEGORIES_PER_ROUND) {
                return {...state, validationErrors: ["You already have three categories selected."]}
            }
            clickedCategories.add(action.payload.category);
            return {...state, clickedCategories: clickedCategories}
        }
        case "CLICK_CATEGORY_UNSELECT": {
            let clickedCategories = new Set([...state.clickedCategories]);
            clickedCategories.delete(action.payload);
            return {...state, clickedCategories: clickedCategories};
        }
        case "LESS_THAN_THREE_CATEGORIES_SELECTED": {
            return {...state, validationErrors: [...state.validationErrors, action.payload]}
        }
        case "CLEAR_ERRORS": {
            return {...state, validationErrors: []}
        }
        case "SET_ROUND_NUMBER": {
            return initialState;
        }
        case "QUIZ_MASTER_ENDED_QUIZ_SUCCESS": return initialState;

        default: return state;
    }
}
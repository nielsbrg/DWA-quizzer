const initialState = [];

export default function categoryReducer(state=initialState, action) {
    switch(action.type) {
        case "STORE_CATEGORIES": {
            return action.payload;
        }
        case "QUIZ_MASTER_ENDED_QUIZ_SUCCESS": return initialState;
        default: return state;
    }
}
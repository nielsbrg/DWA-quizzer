export default function roundReducer(state=0, action) {
    switch(action.type) {
        case "SET_ROUND_NUMBER": {
            return action.payload;
        }
        case "QUIZ_MASTER_ENDED_QUIZ_SUCCESS": return 0;

        default: return state;
    }
}
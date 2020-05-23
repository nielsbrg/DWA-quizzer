export default function quizReducer(state={}, action) {
    switch(action.type) {
        case "NEWQUIZ_FULFILLED": {
            return action.payload.body;
        }
        case "SET_TEAMS_FULFILLED": {
            return action.payload.body;
        }
        case "QUIZ_MASTER_ENDED_QUIZ_SUCCESS": return {};

        default: return state;
    }
}
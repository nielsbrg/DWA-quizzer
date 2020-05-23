export default function appTitle(state="Quizzer", action) {
    switch(action.type) {
        case "CHANGE_TITLE": return action.payload;
        case "QUIZ_MASTER_ENDED_QUIZ_SUCCESS": return "Quizzer";
        default: return state;
    }
}
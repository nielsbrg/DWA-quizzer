export default function appTitle(state="Quizzer", action) {
    switch(action.type) {
        case "CHANGE_TITLE": return action.payload;
        default: return state;
    }
}
const initialState = {
    isLoading: true,
    teamsWithRoundResults: [],
    errors: [],
    messages: [],
    successMessages: [],
    isCurrentlyActive: undefined,
    fetchRoundInformation: false,
    quizHasEnded: false
};

export default function scoreboardReducer(state=initialState, action) {
    switch(action.type) {
        case "ADD_TEAMS": {
            return {...state, isLoading: false, teams: action.payload}
        }
        case "START_QUIZ": {
            return {...state, successMessages: ["The quiz is now active"], messages: [], errors: []}
        }
        case "END_QUIZ": {
            return {...state, quizHasEnded: true}
        }
        case "INTRODUCTION_SCOREBOARD_SUCCESS": {
            return {...state, isLoading: false, messages:[...state.messages, action.payload], isCurrentlyActive: true}
        }
        case "INTRODUCTION_SCOREBOARD_FAILED_NOT_FOUND": {
            return {...state, isLoading: false, isCurrentlyActive: false, fetchRoundInformation: true}
        }
        case "FETCH_ROUND_INFORMATION_PENDING": {
            return {...state, fetchRoundInformation: false}
        }
        case "FETCH_ROUND_INFORMATION_REJECTED": {
            return {...state, messages: [...state.messages, "Could not get information for this quiz."]}
        }
        case "QUIZ_NOT_ACTIVE": {
            return {...state, errors: [...state.errors, action.payload]}
        }
        default: return state;
    }
}
const initialState = {
    teams: [],
    applicants: [],
    quiz: undefined,
    quizLoadErr: undefined,
    searchTerm: "",
    participantsSearchTerm: "",
    isLoading: false,
    showKickAllModal: false,
    showNotReadyModal: false,
    validationErrors: [],
    isFinalizingTeams: false,
    startQuizAfterModalWarning: false
};
export default function lobby(state=initialState, action) {
    switch(action.type) {
        case "CHANGE_SEARCH_TERM": {
            if(action.payload.isParticipants) {
                return {...state, participantsSearchTerm: action.payload.value}
            }
            return {...state, searchTerm: action.payload.value}
        }
        case "ADD_APPLICANT": {
            return {...state, applicants: [...state.applicants, action.payload]}
        }
        case "ESTABLISH_WS": {
            return {...state, isLoading: true}
        }
        case "WS_CONNECTION_FAILURE": {
            return {...initialState, quiz: state.quiz}
        }
        case "WS_CONNECTION_SUCCESS": {
            return {...state, isLoading: false}
        }
        case "ACCEPT_APPLICANT": {
            const newApplicants = [...state.applicants];
            let index = newApplicants.findIndex(x => x === action.payload.name);
            if(index === -1) {
                throw new Error("COULD NOT FIND APPLICANT WITH NAME ", action.payload.name);
            }
            newApplicants.splice(index, 1);
            return {
                ...state,
                applicants: [...newApplicants],
                teams: [...state.teams, action.payload],
            }
        }
        case "REFUSE_APPLICANT_SUCCESS": {
            const newApplicants = [...state.applicants];
            newApplicants.splice(newApplicants.indexOf(action.payload), 1);
            return {...state, applicants: newApplicants}
        }
        case "APPLICANT_CANCEL": {
            const newApplicants = [...state.applicants];
            let indexOfApplicant = newApplicants.indexOf(action.payload);
            if(indexOfApplicant !== -1) {
                newApplicants.splice(newApplicants.indexOf(action.payload), 1);
            }
            else {
                const teams = [...state.teams];
                let indexOfTeams = teams.findIndex(x => x.name === action.payload);
                teams.splice(indexOfTeams, 1);
                return {...state, teams: teams}
            }

            return {...state, applicants: [...newApplicants]}
        }
        case "REFUSE_ALL_APPLICANTS_SUCCESS": {
            return {...state, applicants: []}
        }
        case "ACCEPT_ALL_APPLICANTS_SUCCESS": {
            return {...state, applicants: [], teams: [...state.teams, ...action.payload]}
        }
        case "KICK_ALL_PARTICIPANTS_NOTIFY": {
            return {...state, showKickAllModal: true}
        }
        case "KICK_ALL_USERS_SUCCESS": {
            return {...state, showKickAllModal: false, teams: []}
        }
        case "KICK_ALL_CANCEL": {
            return {...state, showKickAllModal: false}
        }
        case "KICK_USER_SUCCESS": {
            const newParticipants = [...state.teams];
            let index = newParticipants.findIndex(x => x.name === action.payload);
            if(index !== -1) {
                newParticipants.splice(newParticipants.findIndex(x => x.name === action.payload), 1);
            }
            return {...state, teams: newParticipants};
        }
        case "TOGGLE_READYSTATE_OK": {
            let teams = [...state.teams];
            let idx = teams.findIndex(x => x.name === action.payload.name);
                let newTeams = teams.map((x, i) => {
                    if(i === idx) {
                        return { name: action.payload.name, isReady: action.payload.isReady }
                    }
                    else {
                        return x;
                    }
                });
            return {...state, teams: newTeams};
        }
        case "TEAM_DISCONNECTED": {
            let teams = [...state.teams];
            let teamIndex = state.teams.findIndex(x => x.name === action.payload);
            if(teamIndex !== -1) {
                teams.splice(teamIndex,1);
                return {...state, teams: teams}
            }
            let applicants = [...state.applicants];
            let applicantIndex = state.applicants.indexOf(action.payload);
            if(applicantIndex !== -1) {
                applicants.splice(applicantIndex, 1);
                return {...state, applicants: applicants};
            }
            return state;
        }
        case "START_QUIZ_NOT_ALL_TEAMS_READY": {
            return {...state, showNotReadyModal: true}
        }
        case "CANCEL_NOT_READY_MODAL": {
            return {...state, showNotReadyModal: false}
        }
        case "START_QUIZ_NOT_ALL_TEAMS_READY_AFTER_WARNING": {
            return {...state, startQuizAfterModalWarning: true}
        }
        case "STARTED_QUIZ_NOT_ALL_TEAMS_READY": {
            return {...state, startQuizAfterModalWarning: false}
        }
        case "START_QUIZ_NO_TEAMS": {
            return {...state, validationErrors: [...state.validationErrors, action.payload]};
        }
        case "CLEAR_ERRORS": {
            return {...state, validationErrors: []}
        }
        case "POPULATE_ERR_MSG": {
            return {...state, validationErrors: [...state.validationErrors, action.payload]}
        }
        case "SET_TEAMS_PENDING": {
            return {...state, isFinalizingTeams: true}
        }
        case "SET_TEAMS_FULFILLED": {
            return {...state, isFinalizingTeams: false}
        }
        case "SET_TEAMS_REJECTED": {
            return {...state, isFinalizingTeams: false, validationErrors: [...state.validationErrors, action.payload]}
        }
        case "QUIZ_MASTER_ENDED_QUIZ_SUCCESS": return initialState;

        default: return state;
    }
}

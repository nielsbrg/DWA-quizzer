const initialState = {
    currentQuestionNumber: 0,
    currentRoundNumber: 0,
    currentQuestion: "",
    currentCategory: "",
    roundsPlayed: 0,
    teamAnswers: [],
    isActive: undefined,
    teams: [],
    teamsWithRoundResults: [],
    quizId: undefined,
};

export default function quizReducer(state=initialState, action) {
    switch(action.type) {
        case "VERIFY_PASSWORD_FULFILLED": {
            let quiz = action.payload.body;
            return {...state, isActive: quiz.isActive, teams: quiz.teams, quizId: quiz._id}
        }
        case "SET_QUESTION_NR": {
            return {...state, currentQuestionNr: action.payload}
        }
        case "START_QUIZ": {
            return {...state, currentRoundNumber: 1, isActive: true}
        }
        case "END_QUIZ_ROUND_RESULTS": {
            return {...state, teamsWithRoundResults: action.payload}
        }
        case "START_ROUND_FULFILLED": {
            return {
                ...state,
                teamsWithRoundResults: action.payload.teams,
                currentRoundNumber: action.payload.roundNumber,
                currentQuestionNumber: 0,
                roundsPlayed: state.roundsPlayed+1,
                currentQuestion: "",
                currentCategory: "",
                teamAnswers: []
            }
        }
        case "APPROVAL_UPDATE": {
            const teamsWithRoundResults = [...state.teamsWithRoundResults];
            let teamIndex = teamsWithRoundResults.findIndex(x => x.name === action.payload.teamName);
            if(teamIndex !== -1) {
                if(action.payload.approved) {
                    teamsWithRoundResults[teamIndex].roundResults[state.currentRoundNumber-1].correctAnswers++;
                }
                else if(action.payload.subtract) {
                    teamsWithRoundResults[teamIndex].roundResults[state.currentRoundNumber-1].correctAnswers--;
                }
            }
            const teamAnswers = [...state.teamAnswers];
            teamAnswers[teamIndex].approved = action.payload.approved;
            return {...state, teamsWithRoundResults: teamsWithRoundResults, teamAnswers: teamAnswers}
        }
        case "START_NEXT_QUESTION": {
            return {...state, teamAnswers: [], currentQuestion: "", currentCategory: ""}
        }
        case "ADD_TEAMS": {
            let teamsWithHasAnswered = action.payload.map(x => {
                return {
                    teamName: x.name,
                    hasAnswered: false
                }
            });
            return {...state, teams: teamsWithHasAnswered};
        }
        case "CLOSE_QUESTION": {
            return {...state, teamAnswers: action.payload}
        }
        case "TEAM_SUBMITTED_ANSWER": {
            const teams = [...state.teams];
            let index = teams.findIndex(x => x.teamName === action.payload.teamName);
            if(index !== -1) {
                teams[index].hasAnswered = true;
            }
            else {throw new Error("Lost team somewhere along the way!")}
            return {...state, teams: teams}
        }
        case "START_NEW_QUESTION": {
            const teams = [...state.teams];
            teams.forEach(team => team.hasAnswered = false);
            return {
                ...state,
                currentQuestion: action.payload.question,
                currentQuestionNumber: state.currentQuestionNumber + 1,
                currentCategory: action.payload.category,
                answer: action.payload.answer,
                teams: teams,
                teamAnswers: []
            }
        }
        case "FETCH_ROUND_INFORMATION_FULFILLED": {
            const resultJSON = action.payload.body;
            const questionData = resultJSON[resultJSON.length - 1].questionData;
            const currentRoundNumber = resultJSON.length;
            const currentQuestionNumber = questionData.length;
            const currentQuestion = questionData[questionData.length - 1].question.question;
            const currentCategory = questionData[questionData.length - 1].question.category;
            const teamAnswers = questionData[questionData.length - 1].teamAnswers;
            console.log(teamAnswers);
            return {
                ...state,
                currentQuestionNumber: currentQuestionNumber,
                currentRoundNumber: currentRoundNumber,
                currentQuestion: currentQuestion,
                currentCategory: currentCategory,
                roundsPlayed: currentRoundNumber,
                teamAnswers: teamAnswers
            };
        }
        default: return state;
    }
}
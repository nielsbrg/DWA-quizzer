const initialState = {
    teams: [],
    teamCorrectAnswers: []
};

const FIRST_PLACE_RP = 4;
const SECOND_PLACE_RP = 2;
const THIRD_PLACE_RP = 1;
const NORMAL_RP = 0.1;

export default function teamReducer(state=initialState, action) {
    switch(action.type) {
        case "SET_TEAMS_FULFILLED": {
            const teams = action.payload.body.teams;
            const teamCorrectAnswers = teams.map(x => {
                return {
                    teamName: x.name,
                    correctAnswers: 0
                }
            });
            return {...state, teams: teams, teamCorrectAnswers}
        }
        case "START_ROUND_FULFILLED": {
            const teams = [...state.teams];
            teams.forEach(team => {
                team.roundResults.push({roundNumber: action.payload.body.roundNumber, correctAnswers: 0});
            });
            return {...state, teams: teams};
        }
        case "APPROVE_ANSWER": {
            const teams = [...state.teams];
            const teamCorrectAnswers = [...state.teamCorrectAnswers];

            const {roundNumber:roundNr, teamName} = action.payload;
            let teamIndex = teams.findIndex(x => x.name === teamName);
            if(teamIndex === -1) {
                throw new Error("Team does not exist anymore?");
            }
            let roundResultIndex = teams[teamIndex].roundResults.findIndex(x => x.roundNumber === roundNr);


            console.log(action.payload.teamName, "teamIndex: " + teamIndex, "roundResultIndex: " + roundResultIndex)

            if(roundResultIndex === -1) {
                teams[teamIndex].roundResults.push({roundNumber: roundNr, correctAnswers: 1})
                teamCorrectAnswers[teamIndex].correctAnswers = 1;
            }
            else {
                teamCorrectAnswers[teamIndex].correctAnswers = teams[teamIndex].roundResults[roundResultIndex].correctAnswers+ 1;
                teams[teamIndex].roundResults[roundResultIndex].correctAnswers++;
            }
            return {...state, teams: teams, teamCorrectAnswers: teamCorrectAnswers};
        }
        case "DISAPPROVE_ANSWER": {
            const teams = [...state.teams];
            const teamCorrectAnswers = [...state.teamCorrectAnswers];

            const {roundNumber:roundNr, teamName} = action.payload;
            let teamIndex = teams.findIndex(x => x.name === teamName);
            if(teamIndex === -1) {
                throw new Error("Team does not exist anymore");
            }
            let roundResultIndex = teams[teamIndex].roundResults.findIndex(x => x.roundNumber === roundNr);
            if(roundResultIndex === -1) {
                teams[teamIndex].roundResults.push({roundNumber: roundNr, correctAnswers: 0})
            }
            else {
                if(teams[teamIndex].roundResults[roundResultIndex].correctAnswers > 0) {
                    if(action.payload.subtract) {
                        teamCorrectAnswers[teamIndex].correctAnswers = teams[teamIndex].roundResults[roundResultIndex].correctAnswers - 1;
                        teams[teamIndex].roundResults[roundResultIndex].correctAnswers--;
                    }
                }
            }
            return {...state, teams: teams, teamCorrectAnswers: teamCorrectAnswers};
        }
        case "CALCULATE_ROUND_POINTS": {
            const teams = [...state.teams];
            const teamCorrectAnswers = [...state.teamCorrectAnswers];

            // const firstPlaceCorrectAnswers = getMaxCorrectAnswers(state.teamCorrectAnswers);
            // const secondPlaceCorrectAnswers = getMaxCorrectAnswers(state.teamCorrectAnswers, firstPlaceCorrectAnswers);
            // const thirdPlaceCorrectAnswers = getMaxCorrectAnswers(state.teamCorrectAnswers, firstPlaceCorrectAnswers, secondPlaceCorrectAnswers);
            //
            // console.log(firstPlaceCorrectAnswers, secondPlaceCorrectAnswers, thirdPlaceCorrectAnswers);
            //
            // for(let i = 0; i < teams.length; i++) {
            //     console.log(teams[i], state.teamCorrectAnswers[i]);
            //     if(state.teamCorrectAnswers[i].correctAnswers === firstPlaceCorrectAnswers) {
            //         teams[i].totalRoundPoints += FIRST_PLACE_RP;
            //     }
            //     else if(state.teamCorrectAnswers[i].correctAnswers === secondPlaceCorrectAnswers) {
            //         teams[i].totalRoundPoints += SECOND_PLACE_RP;
            //     }
            //     else if(state.teamCorrectAnswers[i].correctAnswers === thirdPlaceCorrectAnswers) {
            //         teams[i].totalRoundPoints += THIRD_PLACE_RP;
            //     }
            //     else {
            //         teams[i].totalRoundPoints += NORMAL_RP;
            //     }
            // }

            let scoresDescending = [...new Set(teamCorrectAnswers.sort((a, b) => {return b.correctAnswers - a.correctAnswers}).map(x => x.correctAnswers))];
            let roundNr = action.payload - 1;

            console.log(scoresDescending, "ROUNDNR", roundNr, teams);
            teams.forEach(team => {
                if(team.roundResults[roundNr].correctAnswers === scoresDescending[0]) {
                    team.totalRoundPoints += FIRST_PLACE_RP;
                }
                else if(team.roundResults[roundNr].correctAnswers === scoresDescending[1]) {
                    team.totalRoundPoints += SECOND_PLACE_RP;
                }
                else if(team.roundResults[roundNr].correctAnswers === scoresDescending[2]) {
                    team.totalRoundPoints += THIRD_PLACE_RP;
                }
                else {
                    team.totalRoundPoints += NORMAL_RP;
                }
            });

            teamCorrectAnswers.forEach(teamCorrectAnswers => {
                teamCorrectAnswers.correctAnswers = 0;
            });
            return {...state, teams: teams, teamCorrectAnswers: teamCorrectAnswers}
        }
        default: return state;
    }
}

function getMaxCorrectAnswers(array, firstMaxCorrect, secondMaxCorrect) {
    let maxCorrectAnswers = array[0].correctAnswers;
    for(let i = 1; i < array.length; i++) {
        if(array[i].correctAnswers > maxCorrectAnswers) {
            if(firstMaxCorrect !== undefined && array[i].correctAnswers === firstMaxCorrect) {
                continue;
            }
            else if(secondMaxCorrect !== undefined && array[i].correctAnswers === secondMaxCorrect) {
                continue;
            }
            maxCorrectAnswers = array[i].correctAnswers;
        }
    }
    return maxCorrectAnswers;
}
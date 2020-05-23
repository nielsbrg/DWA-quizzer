const initialState = {
    endResults: [],
    uniqueScores: new Set()
};

export function quizEndReducer(state=initialState, action) {
    switch(action.type) {
        case "CALCULATE_TOP_THREE_QUIZ_END": {
            let sortedList = action.payload.sort((a, b) => {
                return b.totalRoundPoints - a.totalRoundPoints;
            });

            let uniqueScores = [...new Set(sortedList.map(x => x.totalRoundPoints))];

            let endResults = sortedList.map(x => {
                let obj = {
                    name: x.name,
                    totalRP: x.totalRoundPoints,
                };
                uniqueScores.forEach((score,i) => {
                    if(obj.totalRP === score) {
                        obj.place = i+1;
                    }
                });
                return obj;
            });

            return {...state, endResults: endResults}
        }
        default: return state;
    }
}
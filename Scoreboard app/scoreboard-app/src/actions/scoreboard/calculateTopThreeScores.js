export function calculateTopThreeScores(teamsWithRoundResults) {
    return {
        type: "CALCULATE_TOP_THREE_QUIZ_END",
        payload: teamsWithRoundResults
    }
}
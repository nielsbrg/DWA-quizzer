module.exports = function startRound(number) {
    return {
        type: "START_ROUND",
        roundNumber: number
    }
};
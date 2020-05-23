import request from 'superagent'

export function approveAnswer(teamName, roundNumber) {
    return {
        type: "APPROVE_ANSWER",
        payload: {
            teamName: teamName,
            approved: true,
            roundNumber: roundNumber
        }
    }
}

export function disapproveAnswer(teamName, roundNumber, subtractBool) {
    return {
        type: "DISAPPROVE_ANSWER",
        payload: {
            teamName: teamName,
            approved: false,
            roundNumber: roundNumber,
            subtract: subtractBool
        }
    }
}

export function onNextQuestionWithoutAllApproved() {
    return {
        type: "NEXT_QUESTION_UNAPPROVED",
        payload: "There are still answers that need your approval"
    }
}

export function recordQuestionResults(quizId, roundNumber, question, answers, teamData) {
    console.log(answers);
    let URL = `http://localhost:8080/quizzes/${quizId}/rounds/${roundNumber}/questions/${question._id}/answers`;
    return {
        type: "RECORD_QUESTION_RESULTS",
        payload: request("POST", URL).send({answers: answers, teamData: teamData})
    }
}
import request from 'superagent'

export function startRoundRequest(quizId, roundNumber) {
    return {
        type: "START_ROUND",
        payload: request("POST", `http://localhost:8080/quizzes/${quizId}/rounds`).send({roundNumber: roundNumber})
    }
}

export function fetchCategories() {
    return {
        type: "FETCH_CATEGORIES",
        payload: request("GET", "http://localhost:8080/categories")
    }
}

export function storeCategories(categories) {
    return {
        type: "STORE_CATEGORIES",
        payload: categories
    }
}

export function addThisCategory(category, maxCategoriesPerRound) {
    return {
        type: "CLICK_CATEGORY",
        payload: {
            category: category,
            MAX_CATEGORIES_PER_ROUND: maxCategoriesPerRound
        }
    }
}

export function deleteThisCategory(categoryIndex) {
    return {
        type: "CLICK_CATEGORY_UNSELECT",
        payload: categoryIndex
    }
}

export function submitLessThanThreeCategories(nrOfCategoriesSelected, maxCategoriesPerRound) {
    return {
        type: "LESS_THAN_THREE_CATEGORIES_SELECTED",
        payload: `You have selected ${nrOfCategoriesSelected} categories. Please select at least ${maxCategoriesPerRound} categories to continue.`
    }
}

export function setQuestionNr(questionNr) {
    return {
        type: "SET_QUESTION_NR",
        payload: questionNr
    }
}

export function fetchQuestionsForCategories(categories, quizId, maxQuestionsPerCategory) {
    let promises = [...categories].map(category => {
        return request(`GET`, `http://localhost:8080/questions`)
                .query({ category: category})
                .query({ limit: maxQuestionsPerCategory})
                .query({ quizId: quizId})
    });
    return {
        type: "FETCH_QUESTIONS",
        payload: Promise.all(promises)
    }
}

export function calculateRoundPoints(roundNumber) {
    return {
        type: "CALCULATE_ROUND_POINTS",
        payload: roundNumber
    }
}

export function fetchQuestionsFailed(err) {
    return {
        type: "FETCH_QUESTIONS_FAILED",
        payload: err.message
    }
}

export function storeSuggestedQuestions(questionsPerCategory) {
    return {
        type: "STORE_SUGGESTED_QUESTIONS",
        payload: questionsPerCategory
    }
}

export function setRoundNumber(roundNumber) {
    return {
        type: "SET_ROUND_NUMBER",
        payload: roundNumber
    }
}

export function showEndRoundModal(bool) {
    return {
        type: "SHOW_END_ROUND_MODAL",
        payload: bool
    }
}

export function endQuiz(bool) {
    return {
        type: "HAS_ENDED_QUIZ",
        payload: bool
    }
}
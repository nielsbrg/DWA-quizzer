const QuizNight = require("../src/models/quizNight");
const QuizRound = require("../src/models/quizRound");
const Category = require("../src/models/category");
const QuizQuestion = require("../src/models/quizQuestion");

const readFileP = require("../src/misc/helperFunctions");
let questionData = [];

function insertQuizNights() {
    QuizNight.count().then((count) => {
        if(count > 0) {
            return Promise.resolve();
        }
        else {
            return readFileP("./test/resources/QuizNights.json", {encoding: "utf8"})
                .then((data) => {
                    let quizNights = JSON.parse(data);
                    return QuizNight.insertMany(quizNights);
                });
        }
    })
}

function insertQuizRounds() {
    QuizRound.count().then((count) => {
        if(count > 0) {
            return Promise.resolve();
        }
        else {
            return readFileP("./test/resources/QuizRounds.json", {encoding: "utf8"})
                .then((data) => {
                    let quizRounds = JSON.parse(data);
                    return QuizRound.insertMany(quizRounds);
                });
        }
    });
}

function insertCategoriesAndQuestions() {
    Category.count().then(count => {
        if(count > 0) {
            return Promise.resolve();
        }
        else {
            return readFileP("./resources/Questions.json", {encoding: "utf8"})
                .then(data => {
                    questionData = JSON.parse(data);
                    let uniqueCategories = new Set(questionData.map(x => x.category));
                    return Category.insertMany([...uniqueCategories].map(categoryString => { return {_id: categoryString}}))
                        .then(() => {
                            return QuizQuestion.insertMany(questionData);
                        })
                        .catch((err) => Promise.reject(err));
                });
        }
    })
}

function removeAllData() {
    return Category.remove({})
        .then(() => QuizQuestion.remove({}))
        .then(() => QuizRound.remove({}))
        .then(() => QuizNight.remove({}))
        .catch(err => Promise.reject(err));
}

function resetDatabase() {
    return removeAllData()
        .then(() => insertCategoriesAndQuestions())
        .then(() => insertQuizNights())
        .then(() => insertQuizRounds())
        .catch(err => Promise.reject(err))
}

module.exports = {
    resetDatabase
};

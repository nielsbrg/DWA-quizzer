const Category = require("../models/category");
const QuizQuestion = require("../models/quizQuestion");
const readFileP = require("./helperFunctions");

function fillEmptyDatabase() {
    return Promise.all([Category.count(), QuizQuestion.count()])
        .then((counts) => {
            if(counts[0] === 0 && counts[1] === 0) {
                return readFileP("resources/Questions.json", {encoding: "utf8"});
            }
            else if(counts[1] === 0) {
                return readFileP("resources/Questions.json", {encoding: "utf8"}).then(data => {
                    const questions = JSON.parse(data);
                    return insertQuestions(questions);
                })
                .then(done => Promise.reject(counts[0] + " categories and inserted all questions in the database"));
            }
            return Promise.reject(counts[0] + " categories and " + counts[1] + " questions in the database");
        })
        .then((data) => {
            const questions = JSON.parse(data);
            return insertCategories(questions);
        })
        .then((questions) => {
            return insertQuestions(questions);
        })
        .catch((err) => {
            if(process.env.NODE_ENV === 'test') {
                return;
            }
            console.log(err);
        });
};


function insertCategories(questions) {
    let uniqueCategories = new Set(questions.map(x => x.category));
    return Category.insertMany([...uniqueCategories].map((categoryString) => { return {_id: categoryString}}))
        .then((msg) => {
            console.log(`inserted ${uniqueCategories.size} categories`);
            return Promise.resolve(questions);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

function insertQuestions(questions) {
    return QuizQuestion.insertMany(questions).then((msg) => {
        console.log(`inserted ${questions.length} questions`);
        return Promise.resolve(questions);
    });
}

module.exports = {
    fillEmptyDatabase,
};
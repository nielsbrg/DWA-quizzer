const express = require("express");
const questionRouter = express.Router();
const QuizQuestion = require("../models/quizQuestion");
const QuizRound = require("../models/quizRound");

/*
    BASE URL -> /questions
 */

questionRouter.get("/", (req, res, next) => {
    getQuestions(req.query)
        .then((questions) => {
            res.status(200).json(questions);
        })
        .catch((err) => {
            next(err);
        });
});

function getQuestions(query) {
    return new Promise((resolve, reject) => {
        if(query.category) {
            if(query.limit) {
                let limit = parseInt(query.limit);
                if(query.quizId) {
                    QuizRound.find({quizId: query.quizId}, {"questionData.question._id": 1})
                        .then(submittedRounds => {
                            return getAlreadyAskedQuestions(submittedRounds);
                        })
                        .then(setOfAlreadyAskedQuestions => {
                            return QuizQuestion.find({category: query.category, _id: { $nin: setOfAlreadyAskedQuestions } }).count()
                                .then(count => {
                                    let skip = getRandomNumberBetween(0, count);
                                    if(count - skip < limit) {
                                        skip = count - limit;
                                    }
                                    return Promise.resolve({setOfAlreadyAskedQuestions: setOfAlreadyAskedQuestions, skip: skip});
                                });
                        })
                        .then(resultObj => {
                            QuizQuestion.find({category: query.category, _id: { $nin: resultObj.setOfAlreadyAskedQuestions } })
                                .skip(resultObj.skip).limit(parseInt(query.limit)).exec((err, questions) => {
                                if(err) reject(err);
                                resolve(questions);
                            });
                        })
                        .catch(err => reject(err))
                }
                else {
                    QuizQuestion.find({category: query.category}).limit(parseInt(query.limit)).exec((err, questions) => {
                        if(err) reject(err);
                        resolve(questions);
                    });
                }
            }
            else {
                QuizQuestion.find({category: query.category}).exec((err, questions) => {
                    if(err) reject(err);
                    resolve(questions);
                });
            }
        }
        else {
            QuizQuestion.find({}).exec((err, questions) => {
                if(err) reject(err);
                resolve(questions);
            });
        }
    });
}

function getAlreadyAskedQuestions(submittedRounds) {
    return submittedRounds.map(round => {
        return round.questionData.map(questionObj => {
            return questionObj.question._id;
        });
    }).reduce((accumulator, current) => {
        accumulator.concat(current);
        return accumulator;
    });
}

function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

module.exports = questionRouter;

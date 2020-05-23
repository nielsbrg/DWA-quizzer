const express = require("express");
const quizRoundRouter = express.Router({mergeParams: true});
const QuizRound = require("../models/quizRound");
const QuizNight = require("../models/quizNight");
const { newRoundValidator, newQuestionValidator, submitAnswersValidator } = require("../validation/quizRoundValidators");
const validate = require("express-validation");
const APIError = require("../misc/APIError");
/*
    BASE URL -> /quizzes/:quizId/rounds
 */

quizRoundRouter.get("/", (req, res, next) => {
   QuizRound.find({quizId: req.params.quizId})
       .then(quizRounds => res.status(200).json(quizRounds))
       .catch(err => next(err));
});

quizRoundRouter.get("/:roundNumber", (req ,res, next) => {
    QuizRound.find({quizId: req.params.quizId, roundNumber: req.params.roundNumber})
        .then(quizRound => res.status(200).json(quizRound))
        .catch(err => next(err));
});

quizRoundRouter.get("/:roundNumber/questions", (req, res, next) => {
    QuizRound.findOne({quizId: req.params.quizId,roundNumber: req.params.roundNumber},{"questionData": 1})
        .then(result => res.status(200).json(result.questionData.map(x => x.question)))
        .catch(err => next(err));
});

quizRoundRouter.get("/:roundNumber/questions/:questionId/", (req, res, next) => {
    getQuestionData(req.params.quizId, req.params.roundNumber, req.params.questionId)
        .then(result => res.status(200).json(result.questionData[0].question))
        .catch(err => next(err));
});

quizRoundRouter.get("/:roundNumber/questions/:questionId/answers", (req, res, next) => {
    getQuestionData(req.params.quizId, req.params.roundNumber, req.params.questionId)
        .then(result => res.status(200).json(result.questionData[0].teamAnswers))
        .catch(err => next(err));
});

quizRoundRouter.post("/", validate(newRoundValidator), (req, res, next) => {
    const round = new QuizRound({
        quizId: req.params.quizId,
        roundNumber: req.body.roundNumber,
        questionData: []
    });
    round.save()
        .then(result => res.status(201).json(result))
        .catch(err => next(err));
});

quizRoundRouter.post("/:roundNumber/questions", validate(newQuestionValidator), (req, res, next) => {
    QuizRound.find({quizId: req.params.quizId})
        .then(rounds => {
            if(rounds.map(x => x.roundNumber).indexOf(req.params.roundNumber) === -1) {
                return Promise.reject(
                    APIError(400, "Bad Request", `There is no round ${req.params.roundNumber} in this quiz`)
                );
            }
            const duplicateQuestions = rounds
                .filter(round => round.questionData.length > 0)
                .map(round => round.questionData.map(x => x.question._id))
                .reduce((acc, curr) => { if(curr.length > 0) return acc.concat(curr)}, [])
                .filter(x => x + "" === req.body._id + "");

            if(duplicateQuestions.length > 0) {
                return Promise.reject(
                    APIError(400, "Bad Request",
                        "The question '" + req.body.question + "' " +
                        "has already been asked. Questions may not be repeated within a Quiz Night")
                );
            }

            return QuizRound.findOne({quizId: req.params.quizId, roundNumber: req.params.roundNumber});
        })
        .then(round => {
            round.questionData.push({question: req.body, teamAnswers: []});
            return round.save();
        })
        .then(saveMsg => res.status(201).json(saveMsg))
        .catch(err => next(err));
});

quizRoundRouter.get("/:roundNumber/answers", (req, res, next) => {
    QuizRound.find({
        quizId: req.params.quizId,
        roundNumber: req.params.roundNumber,
    },
    {
        "questionData.teamAnswers": 1
    })
    .then(results => res.status(200).json(results)).catch(err => next(err));
});

quizRoundRouter.post("/:roundNumber/questions/:questionId/answers", validate(submitAnswersValidator), (req, res, next) => {
    console.log(req.body);
    QuizRound.update(
    {
        quizId: req.params.quizId,
        roundNumber: req.params.roundNumber,
        questionData: { $elemMatch: { "question._id": req.params.questionId }}
    },
    {
        $addToSet: { "questionData.$.teamAnswers": { $each: req.body.answers } }
    })
    .then(msg => {
        return QuizNight.update(
            {
                _id: req.params.quizId,
            },
            {
                $set: {teams: req.body.teamData}
            }
        );
    })
    .then(msg => {
        console.log(msg);
        res.status(200).json(msg);
    })
    .catch(err => next(err));
});

function getQuestionData(quizId, roundNumber, questionId) {
    return QuizRound.findOne(
        {
            quizId: quizId,
            roundNumber: roundNumber,
            questionData: { $elemMatch: { "question._id": questionId} }
        },
        {"questionData.$": 1});
}

module.exports = quizRoundRouter;
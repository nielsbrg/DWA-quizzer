const express = require("express");
const quizNightRouter = express.Router();
const QuizNight = require("../models/quizNight");
const QuizRound = require("../models/quizRound");
const ObjectId = require('mongodb').ObjectID;
const APIError = require("../misc/APIError");
const validate = require("express-validation");
const {newQuizValidator, addTeamValidator, quizIdValidator } = require("../validation/quizNightValidators");
/*
    BASE URL -> /quizzes
 */

quizNightRouter.get("/", (req, res, next) => {
    getQuizNights(req.query.password)
        .then((quiz) => {
            res.status(200).json(quiz);
        })
        .catch((err) => {
            next(err);
        });
});

quizNightRouter.get("/:quizId", validate(quizIdValidator), (req, res, next) => {
    QuizNight.findOne({_id: req.params.quizId})
        .then((quiz) => {
            res.status(200).json(quiz)
        })
        .catch((err) => {
            next(err);
        });
});

quizNightRouter.get("/:quizId/teams", validate(quizIdValidator), (req, res, next) => {
    QuizNight.findOne({_id: req.params.quizId}, {"teams": 1})
        .then((result) => {
            res.status(200).json(result.teams);
        })
        .catch((err) => {
            next(err);
        })
});

quizNightRouter.post("/", (req, res, next) => {
    if(req.query.verify) {
        QuizNight.findOne({password: req.body.password})
            .then(quiz => {
                if(quiz === null) {
                    res.status(404).json(APIError(res.statusCode, "Not Found", "No quizzes with that password exist"));
                }
                else {
                    res.status(200).json(quiz);
                }
            }).catch(err => next(err));
    }
    else {
        next()
    }
});

quizNightRouter.post("/", validate(newQuizValidator), (req, res, next) => {
    const quizNight = new QuizNight({
        password: req.body.password,
        quizMaster: req.body.name,
        teams: [],
        isActive: false
    });
    quizNight.save()
        .then((msg) => {
            res.status(201).json(msg);
        })
        .catch((err) => {
            if (err.message.indexOf("E11000") !== -1) {
                res.status(400).json(APIError(res.statusCode, "Bad Request", "There was already a quiz with the password '" + req.body.password + "'. Try a different password."));
            }
            else {
                next(err);
            }
        });
});

quizNightRouter.post("/:quizId/teams", validate(quizIdValidator), validate(addTeamValidator), (req, res, next) => {
    QuizNight.findOne({_id: ObjectId(req.params.quizId)})
        .then((quiz) => {
            if(quiz.teams.length !== 0) {
                const names = quiz.teams.map(x => x.name);
                const duplicates = req.body.filter(name => names.indexOf(name) !== -1);
                if(duplicates.length > 0) {
                    let err = APIError(400, "Bad Request", "The name(s) " + duplicates + " already exist(s) for this quiz. " +
                        "No duplicate team names are allowed.");
                    return Promise.reject(err);
                }
            }
            req.body.forEach(teamName => quiz.teams.push({name: teamName}));

            return quiz.save();
        })
        .then((msg) => {
            res.status(200).json(msg);
        })
        .catch((err) => {
            next(err);
        });
});

quizNightRouter.put("/:quizId", validate(quizIdValidator), (req, res, next) => {
    QuizNight.findOne({_id: ObjectId(req.params.quizId)})
        .then((quiz) => {
            quiz.isActive = false;
            return quiz.save();
        })
        .then((msg) => {
            res.status(200).json(msg);
        })
        .catch((err) => {
            next(err);
        })
});

quizNightRouter.delete("/:quizId", validate(quizIdValidator), (req, res, next) => {
    QuizRound.remove({quizId: req.params.quizId})
        .then((msg) => {
            return QuizNight.remove({_id: req.params.quizId})
        })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            next(err);
        });
});

function getQuizNights(password) {
    if(password) {
        return QuizNight.findOne({password: req.query.password});
    }
    return QuizNight.find({});
}

module.exports = quizNightRouter;
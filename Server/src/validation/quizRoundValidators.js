const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

const newRoundValidator = {
    body: {
        roundNumber: Joi.number().required()
    },
    params: {
        quizId: Joi.objectId().required()
    }
};

const newQuestionValidator = {
    body: {
        _id: Joi.objectId().required(),
        question: Joi.string().required(),
        category: Joi.string().required()
    },
    params: {
        quizId: Joi.objectId().required(),
        roundNumber: Joi.number().required()
    }
};

const answerSchema = Joi.object().keys({
    teamName: Joi.string().required(),
    answer: Joi.string().required(),
    approved: Joi.boolean().required()
});

const submitAnswersValidator = {
    body: {
        answers: Joi.array().items(answerSchema).min(1).required(),
        teamData: Joi.array().required()
    },
    params: {
        quizId: Joi.objectId().required(),
        roundNumber: Joi.number().required(),
        questionId: Joi.objectId().required()
    }
};

module.exports = {
    newRoundValidator,
    newQuestionValidator,
    submitAnswersValidator,
};
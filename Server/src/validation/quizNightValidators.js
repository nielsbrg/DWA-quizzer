const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

const newQuizValidator = {
    body: {
        name: Joi.string().required(),
        password: Joi.string().required()
    }
};

const addTeamValidator = {
    body: Joi.array().items(Joi.string()).unique((a, b) => a === b)
};

const quizIdValidator = {
    params: {
        quizId: Joi.objectId().required()
    }
};

module.exports = {
    newQuizValidator,
    addTeamValidator,
    quizIdValidator
};

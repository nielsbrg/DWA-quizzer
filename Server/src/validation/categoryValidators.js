const Joi = require("joi");

module.exports = getQuestionsByCategoryValidator = {
    query: {
        password: Joi.string()
    }
};
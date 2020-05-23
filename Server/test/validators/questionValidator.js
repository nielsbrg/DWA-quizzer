const Joi = require("joi");

const validQuestionSchema = {
    _id: Joi.objectId().required(),
    question: Joi.string().required(),
    answer: Joi.string().required(),
    category: Joi.string().required()
};

module.exports = function isValidQuestion(question) {
    return Joi.validate(question, validQuestionSchema);
}
const Joi = require("joi");

const validCategorySchema = {
    _id: Joi.string().required(),
};

module.exports = function isValidCategory(category) {
    return Joi.validate(category, validCategorySchema);
}
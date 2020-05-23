const Joi = require("joi");

const validTeamSchema = Joi.object().keys({
    name: Joi.string().required(),
    roundResults: Joi.array().required(),
    totalRoundPoints: Joi.number().required()
});

const validQuizNightSchema = Joi.object().keys({
    _id: Joi.objectId().required(),
    quizMaster: Joi.string().required(),
    teams: Joi.array().items(validTeamSchema).required(),
    password: Joi.string().required(),
    isActive: Joi.boolean().required()
});

function isValidQuizNight(quizNight) {
    return Joi.validate(quizNight, validQuizNightSchema);
}

function isValidTeam(team) {
    return Joi.validate(team, validTeamSchema);
}

module.exports = {
    isValidQuizNight,
    isValidTeam
}
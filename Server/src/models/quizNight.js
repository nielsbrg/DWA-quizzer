const mongoose = require("mongoose");

const roundResultSchema = new mongoose.Schema({
    roundNumber: Number,
    correctAnswers: Number
}, { _id : false, versionKey: false });

const teamSchema = new mongoose.Schema({
    name: String,
    totalRoundPoints: {type: Number, default: 0},
    roundResults: [roundResultSchema]
}, { _id : false, versionKey: false });

const quizNightSchema = new mongoose.Schema({
    password: {type: String, required: true, unique: true },
    quizMaster: {type: String, required: true },
    isActive: {type: Boolean, default: true },
    teams: [teamSchema]
}, {versionKey: false});

module.exports = mongoose.model("quizNight", quizNightSchema);

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, ref: "quizQuestion"},
    question: {type: String, required: true},
    category: {type: String, ref: "category", required: true}
}, {versionKey: false});

const teamAnswerSchema = new mongoose.Schema({
    teamName: String,
    answer: String,
    approved: String
}, {_id: false, versionKey: false});

const questionDataSchema = new mongoose.Schema({
    question: questionSchema,
    teamAnswers: [teamAnswerSchema]
}, {_id: false, versionKey: false});

const quizRoundSchema = new mongoose.Schema({
    quizId: {type: mongoose.Schema.Types.ObjectId, ref: "quizNight"},
    roundNumber: {type: Number, required: true},
    questionData: [questionDataSchema]
}, {versionKey: false});

quizRoundSchema.index({_id: 1, roundNumber: 1}, {unique: true});

module.exports = mongoose.model("quizRound", quizRoundSchema);
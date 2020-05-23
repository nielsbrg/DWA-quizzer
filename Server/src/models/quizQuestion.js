const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema({
    question: {type: String, required: true},
    answer: {type: String, required: true},
    category: {type: String, required: true, ref: "Category"}
}, {versionKey : false});

module.exports = mongoose.model("quizQuestion", quizQuestionSchema);


const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    _id: {type: String}
}, {versionKey: false});

module.exports = mongoose.model("category", categorySchema);
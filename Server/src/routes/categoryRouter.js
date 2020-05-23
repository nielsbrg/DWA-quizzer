const express = require("express");
const categoryRouter = express.Router();
const Category = require("../models/category");
const APIError = require("../misc/APIError");

/*
    BASE URL -> /categories
 */

categoryRouter.get("/", function(req, res) {
    Category.find().then((value) => {
        res.json(value.map(x => x._id));
    })
    .catch((err) => {
        next(err);
    });
});

module.exports = categoryRouter;
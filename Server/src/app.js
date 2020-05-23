"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require("morgan");
const ev = require("express-validation");
const compression = require("compression");
const cors = require("cors");

ev.options({
    contextRequest: true
});

const categoryRouter = require("./routes/categoryRouter");
const quizNightRouter = require("./routes/quizNightRouter");
const quizRoundRouter = require("./routes/quizRoundRouter");
const questionRouter = require("./routes/questionRouter");

app.use(cors());
app.use(bodyParser.json());
app.use(compression());

if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}

app.use("/quizzes", quizNightRouter);
app.use("/categories", categoryRouter);
app.use("/questions", questionRouter);
app.use("/quizzes/:quizId/rounds", quizRoundRouter);

app.use((err, req, res, next) => {
    if(err instanceof ev.ValidationError) {
        res.status(err.status).json(APIError(err.status, err.statusText, err.errors.map(x => x.messages.join()).join()));
    }
    else if(err.status) {
        res.status(err.status).json(err);
    }
    else {
        res.status(500).json(APIError(res.statusCode, "Internal Server Error", err.message));
    }
});

module.exports = app;
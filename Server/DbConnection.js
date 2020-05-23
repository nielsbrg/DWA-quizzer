const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

module.exports = function connectToDb() {
    if(process.env.NODE_ENV === 'test') {
        return mongoose.connect("mongodb://localhost/testdb", {useMongoClient: true});
    }
    else {
        const {fillEmptyDatabase} = require("./src/misc/fillEmptyDatabase");
        mongoose.connect("mongodb://localhost/quizzer", {useMongoClient: true}, function() {
            fillEmptyDatabase();
            return mongoose.connection;
        });
    }
};
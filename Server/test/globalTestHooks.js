process.env.NODE_ENV = 'test';
const connectToDb = require("../DbConnection");
const {resetDatabase} = require("./resetDatabase");
let dbConnection;

before((done) => {
    connectToDb().then((conn) => {
        dbConnection = conn;
    })
    .then(() => {
        return resetDatabase();
    })
    .then(() => done())
    .catch((err) => {
        console.log(err.message);
        console.log("Shutting down");
        process.exit();
    });
});

after((done) => {
    dbConnection.close();
    done();
});
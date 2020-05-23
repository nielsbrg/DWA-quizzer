const app = require("./app.js");
const connectToDb = require("../DbConnection");
const http = require('http');
const ws = require('ws');
const handleQuizMasterEvents = require("./webSocketEventHandlers/quizMasterApp/mainEventHandler");
const handleTeamEvents = require("./webSocketEventHandlers/teamApp/mainEventHandler");
const handleScoreboardEvents = require("./webSocketEventHandlers/scoreboardApp/mainEventHandler");
const handleCloseWebSocket = require("./webSocketEventHandlers/handleCloseWebSocket");

const port = 8080;
const httpServer      = http.createServer(app);
const webSocketServer = new ws.Server({
    server: httpServer,
    path: "/quizzerWS",
    clientTracking: true
});

connectToDb();
const quizMasters = new Set();
const teams = new Set();

webSocketServer.on('connection', function connection(clientSocket) {
    console.log("CONNECTION ESTABLISHED");
    clientSocket.on('message', function(msg) {
        let message = JSON.parse(msg);
        handleQuizMasterEvents(webSocketServer, clientSocket, message);
        handleTeamEvents(webSocketServer, clientSocket, message);
        handleScoreboardEvents(webSocketServer, clientSocket, message);
        console.log(message);
    });
    clientSocket.on("close", function(msg) {
        handleCloseWebSocket(webSocketServer, quizMasters, teams);
    });
    clientSocket.on('pong', function (data) {
        if(clientSocket.quizMaster) {
            quizMasters.add(clientSocket.quizMaster.name);
        }
        else if(clientSocket.team) {
            teams.add(clientSocket.team.name);
        }
    });
});

httpServer.listen(port, function () {
    console.log('Listening on ' + httpServer.address().port);
    setInterval(() => {
        webSocketServer.clients.forEach(client => {
            client.ping();
        });
    }, 2000);
});
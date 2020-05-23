const request = require("supertest");
const app = require("../src/app");
const chai = require("chai");
const expect = chai.expect;
const { isValidQuizNight, isValidTeam} = require("./validators/quizNightValidator");
const QuizRound = require("../src/models/quizRound");
const QuizNight = require("../src/models/quizNight");
const {resetDatabase} = require("./resetDatabase");

describe("quizNightRouterTest", () => {
    it("should return all quizNights", done => {
        request(app)
            .get("/quizzes")
            .expect(200)
            .end((err, res) => {
                if(err) done(err);
                expect(res.body).to.be.a('array').length(2);
                res.body.forEach(quizNight => {
                    const result = isValidQuizNight(quizNight);
                    if(result.error) {
                        throw new Error(result.error)
                    }
                });
                done();
            })
    });

    it("should return one quiz", done => {
        request(app)
            .get("/quizzes/59f5c0e54150dd0e10acee4d")
            .expect(200)
            .end((err, res) => {
                if(err) done(err);
                expect(res.body).to.be.a("object");
                const validationResult = isValidQuizNight(res.body);
                if(validationResult.error) {
                    throw new Error(validationResult.error);
                }
                done();
            })
    });

    it("should get all teams from a quiz", done => {
        request(app)
            .get("/quizzes/59f5c0e54150dd0e10acee4d/teams")
            .expect(200)
            .end((err, res) => {
                if(err) done(err);
                expect(res.body).to.be.a('array').length(0);
                request(app)
                    .get("/quizzes/59f5c1208a903d0cd45228d8/teams")
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body).to.be.a('array').length(3);
                        res.body.forEach(team => {
                            let result = isValidTeam(team);
                            if(result.error) {
                                throw new Error(result.error);
                            }
                        });
                        done();
                    });
            })
    });

    it("should create a quiz if supplied with valid data", done => {
        request(app)
            .post("/quizzes")
            .send({name: "Niels Bergervoet", password: "secret"})
            .expect(201)
            .end((err, res) => {
                let validationResult = isValidQuizNight(res.body);
                if(validationResult.error) {
                    throw new Error(validationResult.error);
                }
                resetDatabase();
                done();
            });
    });

    it("should fail creating a quiz if not supplied with valid data", done => {
        request(app)
            .post("/quizzes")
            .send({name: "Niels Bergervoet"})
            .expect(400)
            .end((err, res) => {
                expect(res.body.status).to.equal(400);
                expect(res.body.message).to.equal("\"password\" is required");
                done();
            })
    });

    it("should create teams in a given quiz if supplied with correct data", done => {
        request(app)
            .post("/quizzes/59f5c0e54150dd0e10acee4d/teams")
            .send(["team1", "team2"])
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.be.a('object');
                expect(res.body.teams).to.be.length(2);
                let validationResult = isValidQuizNight(res.body);
                if(validationResult.error) {
                    throw new Error(validationResult.error);
                }
                done();
            })
    });

    it("should fail to create teams if supplied with duplicate team names in the request body", done => {
        request(app)
            .post("/quizzes/59f5c0e54150dd0e10acee4d/teams")
            .send(["team1", "team1"])
            .expect(400)
            .end((err, res) => {
                expect(res.body).to.have.property("message");
                expect(res.body).to.have.property("status");
                expect(res.body.status).equal(400);
                expect(res.body.message).equal('\"value\" position 1 contains a duplicate value');
                done();
            });
    });

    it("should fail to create teams if the newly given teams already exist for the quiz", done => {
        request(app)
            .post("/quizzes/59f5c1208a903d0cd45228d8/teams")
            .send(["team1", "team2"])
            .expect(400)
            .end((err, res) => {
                expect(res.body).to.have.property("status");
                expect(res.body.status).equal(400);
                expect(res.body.message).equal("The name(s) team1,team2 already exist(s) for this quiz. " +
                    "No duplicate team names are allowed.");
                done();
            });
    });

    it("should set a quiz to inactive", done => {
        request(app)
            .put("/quizzes/59f5c1208a903d0cd45228d8")
            .expect(200)
            .end((err, res) => {
                if(err) throw err;
                expect(res.body).to.be.a('object');
                expect(res.body.isActive).equal(false);
                done();
            })
    });

    it("should send neat message if sent quizId in wrong format", done => {
        request(app)
            .put("/quizzes/5")
            .expect(400)
            .end((err, res) => {
                if(err) throw err;
                expect(res.body.status).equal(400);
                expect(res.body.message).equal('"quizId" with value "5" fails to match the required pattern: /^[0-9a-fA-F]{24}$/');
                done();
            });
    });
});
const request = require("supertest");
const app = require("../src/app");
const expect = require("chai").expect;
const isValidQuestion = require("./validators/questionValidator");

describe("questionRouterTest", () => {
    it("should return all questions", (done) => {
        request(app)
            .get("/questions")
            .expect(200)
            .end((err, res) => {
                if(err) done(err);
                expect(res.body).to.be.a('array').length(798);
                done();
            });
    });

    it("should return all questions of a certain category", (done) => {
        request(app)
            .get(`/questions?category=Art%20and%20Literature`)
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.be.a('array');
                res.body.forEach(question => {
                    expect(question).to.include({"category": "Art and Literature"});
                    const schemaValidationResult = isValidQuestion(question);
                    if(schemaValidationResult.error) {
                        throw new Error(schemaValidationResult.error);
                    }
                });
                done();
            })
    })
});
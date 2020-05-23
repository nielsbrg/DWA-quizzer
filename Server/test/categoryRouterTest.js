const request = require("supertest");
const app = require("../src/app");
const expect = require("chai").expect;
const isValidCategory = require("./validators/categoryValidator");

describe("categoryRouterTest", () => {
    it("should return all categories", (done) => {
        request(app)
            .get("/categories")
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.be.a('array');
                res.body.forEach(category => {
                    const validationResult = isValidCategory(category);
                    if(validationResult.error) {
                        throw new Error(validationResult.error);
                    }
                });
                done();
        });
    });
});
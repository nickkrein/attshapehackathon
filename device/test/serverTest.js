process.env.NODE_ENV = "test";


let chai = require("chai");
let chaiHttp = require("chai-http");
let request = require("request");
let server = require("../server/server.js");
let fuzzy = require("chai-fuzzy");

let should = chai.should();
let expect = require("chai").expect;

chai.use(chaiHttp);
chai.use(fuzzy);

let host = "http://127.0.0.1:8219/api";



describe("Public API", () => {
  it("Default /api should load successfully.", (done) => {
    request
      .get(`${host}/`, err, response, body), () => {
        expect(response.statusCode).to.equal(200);
        expect(response).to.have.header("content-type", "application/json; charset=utf-8");
        done();
    }
  });
});
"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { app, runServer, closeServer } = require("../server");
const { User } = require("../users");
const { JWT_SECRET, TEST_DATABASE_URL } = require("../config");

const expect = chai.expect;

chai.use(chaiHttp);

describe("Auth routes", function() {
  const email = "user@test.com";
  const password = "pass23423423";
  const firstName = "Example";
  const lastName = "Name";

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return User.hashPassword(password).then(password =>
      User.create({
        email,
        password,
        firstName,
        lastName
      })
    );
  });

  after(function() {
    return closeServer();
  });

  afterEach(function() {
    return User.remove({});
  });

  describe("/api/auth/login", function() {
    it("Should not pass if nothing is filled out", function() {
      return chai
        .request(app)
        .post("/api/auth/login")
        .then(() => expect.fail(null, null, "Request should not succeed"))
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(400);
        });
    });
    it("Should not pass if email is not completed", function() {
      return chai
        .request(app)
        .post("/api/auth/login")
        .send({ email: null, password })
        .then(function(res) {
          console.log("ASDASD");
          console.log(res);
          expect(res).to.have.status(400);
        })
        .catch(function(err) {
          const res = err.response;

          res.status.should.equal(400);
          res.should.have.status(404);
        });
    });
    it("Should not pass if password is not completed", function() {
      return chai
        .request(app)
        .post("/api/auth/login")
        .send({ email, password: null })
        .then(function(res) {
          expect(res).to.have.status(400);
        });
    });
    it("Should not pass if the email starts with a space", function() {
      return chai
        .request(app)
        .post("/api/auth/login")
        .send({ email: " ", password })
        .then(function(res) {
          expect(res).to.have.status(500);
        });
    });
    it("Should not pass if email is not a non-string", function() {
      return chai
        .request(app)
        .post("/api/auth/login")
        .send({ email: 123, password })
        .then(function(res) {
          expect(res).to.have.status(500);
        });
    });

    it("Should not pass with incorrect email", function() {
      return chai
        .request(app)
        .post("/api/auth/login")
        .send({ email: "wrongEmail", password })
        .then(() => expect.fail(null, null, "Request should not succeed"))
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it("Should not pass with incorrect password", function() {
      return chai
        .request(app)
        .post("/api/auth/login")
        .send({ email, password: "wrongPassword" })
        .then(() => expect.fail(null, null, "Request should not succeed"))
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it("Should return a valid auth token", function() {
      return chai
        .request(app)
        .post("/api/auth/login")
        .send({ email, password })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          const token = res.body.authToken;
          expect(token).to.be.a("string");
          const payload = jwt.verify(token, JWT_SECRET, {
            algorithm: ["HS256"]
          });
          expect(payload.user).to.deep.equal({
            email,
            firstName,
            lastName
          });
        });
    });
  });

  describe("/api/auth/refresh", function() {
    it("Should not pass with no credentials", function() {
      return chai
        .request(app)
        .post("/api/auth/refresh")
        .then(() => expect.fail(null, null, "Request should not succeed"))
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it("Should not pass with an invalid token", function() {
      const token = jwt.sign(
        {
          email,
          firstName,
          lastName
        },
        "wrongSecret",
        {
          algorithm: "HS256",
          expiresIn: "7d"
        }
      );

      return chai
        .request(app)
        .post("/api/auth/refresh")
        .set("Authorization", `Bearer ${token}`)
        .then(() => expect.fail(null, null, "Request should not succeed"))
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it("Should not pass with an expired token", function() {
      const token = jwt.sign(
        {
          user: {
            email,
            firstName,
            lastName
          }
        },
        JWT_SECRET,
        {
          algorithm: "HS256",
          subject: email,
          expiresIn: Math.floor(Date.now() / 1000) - 10 // Expired ten seconds ago
        }
      );

      return chai
        .request(app)
        .post("/api/auth/refresh")
        .set("authorization", `Bearer ${token}`)
        .then(() => expect.fail(null, null, "Request should not succeed"))
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it("Should return a valid auth token with a newer expiry date", function() {
      const token = jwt.sign(
        {
          user: {
            email,
            firstName,
            lastName
          }
        },
        JWT_SECRET,
        {
          algorithm: "HS256",
          subject: email,
          expiresIn: "7d"
        }
      );
      const decoded = jwt.decode(token);

      return chai
        .request(app)
        .post("/api/auth/refresh")
        .set("authorization", `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          const token = res.body.authToken;
          expect(token).to.be.a("string");
          const payload = jwt.verify(token, JWT_SECRET, {
            algorithm: ["HS256"]
          });
          expect(payload.user).to.deep.equal({
            email,
            firstName,
            lastName
          });
          expect(payload.exp).to.be.at.least(decoded.exp);
        });
    });
  });
});

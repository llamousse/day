"use strict";

const chai = require("chai");
const faker = require("faker");
const mongoose = require("mongoose");
const chaiHttp = require("chai-http");
const jwt = require("jsonwebtoken");

const { app, runServer, closeServer } = require("../server");
const { Post } = require("../posts");
const { TEST_DATABASE_URL } = require("../config");

const should = chai.should();

chai.use(chaiHttp);

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn("Deleting database");
    mongoose.connection
      .dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

function seedPostData() {
  console.info("seeding post data");
  const seedData = [];
  for (let i = 1; i <= 10; i++) {
    seedData.push({
      title: faker.lorem.sentence(),
      date: Date.now(),
      description: faker.lorem.text()
    });
  }

  return Post.insertMany(seedData);
}

describe("/api/posts", function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedPostData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe("GET endpoint", function() {
    it("should return all existing posts", function() {
      let res;
      return chai
        .request(app)
        .get("/api/posts")
        .then(_res => {
          res = _res;
          res.should.have.status(200);
          res.body.should.have.lengthOf.at.least(1);
          return Post.count();
        })
        .then(count => {
          res.body.should.have.lengthOf(count);
        });
    });

    it("should return posts with right fields", function() {

      let resPost;

      return chai
        .request(app)
        .get("/api/posts")
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("array");
          res.body.should.have.lengthOf.at.least(1);

          // console.log(res.body); //THIS LETS YOU SEE THE POSTS IN THE CONSOLE

          res.body.forEach(function(post) {
            post.should.be.a("object");
            post.should.include.keys("title", "date", "description");
          });

          resPost = res.body[0];

          return Post.findById(resPost.id);

        })
        .then(function(post) {
          resPost.title.should.equal(post.title);
          resPost.description.should.equal(post.description);
        });
    });

  });

  describe("POST endpoint", function() {
    it("should add a new post", function() {
      const newPost = {
        title: "this is a post",
        description: "test test test",
        date: Date.now()
      };

      return chai
        .request(app)
        .post("/api/posts")
        .send(newPost)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.include.keys("title", "date", "description");
          res.body.title.should.equal(newPost.title);
          res.body.id.should.not.be.null;
          res.body.description.should.equal(newPost.description);
          return Post.findById(res.body.id);
        })
        .then(function(post) {
          post.title.should.equal(newPost.title);
          post.description.should.equal(newPost.description);
        });
    });
  });

  describe("PUT endpoint", function() {
    it("should update fields you send over", function() {
      const updateData = {
        title: "cats cats cats",
        description: "dogs dogs dogs",
        date: Date.now()
      };

      return Post.findOne()
        .then(post => {
          updateData.id = post.id;

          return chai
            .request(app)
            .put(`/api/posts/${post.id}`)
            .send(updateData);
        })
        .then(res => {
          res.should.have.status(204);
          return Post.findById(updateData.id);
        })
        .then(post => {
          post.title.should.equal(updateData.title);
          post.description.should.equal(updateData.description);
        });
    });
  });

  describe("DELETE endpoint", function() {
    it("should delete a post by id", function() {
      let post;

      return Post.findOne()
        .then(_post => {
          post = _post;
          return chai.request(app).delete(`/api/posts/${post.id}`);
        })
        .then(res => {
          res.should.have.status(204);
          return Post.findById(post.id);
        })
        .then(_post => {
          should.not.exist(_post);
        });
    });
  });
});

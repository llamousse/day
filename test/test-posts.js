'use strict';

const chai = require('chai');
const faker = require('faker');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const jwt = require("jsonwebtoken");

const { app, runServer, closeServer } = require('../server');
const { Post } = require('../posts');
const { TEST_DATABASE_URL } = require('../config');

const should = chai.should();

chai.use(chaiHttp);

function tearDownDb() {
  return new Promise((resolve, reject) => {
  console.warn('Deleting database');
  mongoose.connection.dropDatabase()
    .then(result => resolve(result))
    .catch(err => reject(err));
  });
}

function seedPostData() {
  console.info('seeding post data');
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

describe('/api/posts', function() {

  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function () {
    return seedPostData();
  });

  afterEach(function () {
    // return Post.remove({});
    return tearDownDb();
  });

  after(function () {
    return closeServer();
  });

  describe('GET endpoint', function () {

    it('should return all existing posts', function () {
      // strategy:
      //    1. get back all posts returned by by GET request to `/posts`
      //    2. prove res has right status, data type
      //    3. prove the number of posts we got back is equal to number
      //       in db.
      let res;
      return chai.request(app)
        .get('/api/posts')
        .then(_res => {
          res = _res;
          res.should.have.status(200);
          res.body.should.have.lengthOf.at.least(1);
          return Post.count();
        })
        .then(count => {
          // the number of returned posts should be same
          // as number of posts in DB
          res.body.should.have.lengthOf(count);
        });
    });

    it('should return posts with right fields', function () {
      // Strategy: Get back all posts, and ensure they have expected keys

      let resPost;
      return chai.request(app)
        .get('/api/posts')
        .then(function (res) {

          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.have.lengthOf.at.least(1);

          res.body.forEach(function (post) {
            post.should.be.a('object');
            post.should.include.keys('date', 'title', 'description');
          });
          // just check one of the posts that its values match with those in db
          // and we'll assume it's true for rest
          resPost = res.body[0];
          return Post.findById(resPost.id);
        })
        .then(post => {
          resPost.title.should.equal(post.date);
          resPost.date.should.equal(post.title);
          resPost.type.should.equal(post.type);
        });
    });
  });

  // describe('POST endpoint', function () {
  //   // strategy: make a POST request with data,
  //   // then prove that the post we get back has
  //   // right keys, and that `id` is there (which means
  //   // the data was inserted into db)
  //   it('should add a new blog post', function () {
  //
  //     const newPost = {
  //       title,
  //       type,
  //       date: Date.now()
  //     };
  //
  //     return chai.request(app)
  //       .post('/api/posts')
  //       .send(newPost)
  //       .then(function (res) {
  //         res.should.have.status(201);
  //         res.should.be.json;
  //         res.body.should.be.a('object');
  //         res.body.should.include.keys(
  //           'id', 'title', 'content', 'author', 'created');
  //         res.body.title.should.equal(newPost.title);
  //         // cause Mongo should have created id on insertion
  //         res.body.id.should.not.be.null;
  //         res.body.author.should.equal(
  //           `${newPost.author.firstName} ${newPost.author.lastName}`);
  //         res.body.content.should.equal(newPost.content);
  //         return Post.findById(res.body.id);
  //       })
  //       .then(function (post) {
  //         post.title.should.equal(newPost.title);
  //         post.content.should.equal(newPost.content);
  //         post.author.firstName.should.equal(newPost.author.firstName);
  //         post.author.lastName.should.equal(newPost.author.lastName);
  //       });
  //   });
  // });

  // describe('PUT endpoint', function () {
  //
  //   // strategy:
  //   //  1. Get an existing post from db
  //   //  2. Make a PUT request to update that post
  //   //  4. Prove post in db is correctly updated
  //   it('should update fields you send over', function () {
  //     const updateData = {
  //       title: 'cats cats cats',
  //       content: 'dogs dogs dogs',
  //       author: {
  //         firstName: 'foo',
  //         lastName: 'bar'
  //       }
  //     };
  //
  //     return Post
  //       .findOne()
  //       .then(post => {
  //         updateData.id = post.id;
  //
  //         return chai.request(app)
  //           .put(`/api/posts/${post.id}`)
  //           .send(updateData);
  //       })
  //       .then(res => {
  //         res.should.have.status(204);
  //         return Post.findById(updateData.id);
  //       })
  //       .then(post => {
  //         post.title.should.equal(updateData.title);
  //         post.content.should.equal(updateData.content);
  //         post.author.firstName.should.equal(updateData.author.firstName);
  //         post.author.lastName.should.equal(updateData.author.lastName);
  //       });
  //   });
  // });

  // describe('DELETE endpoint', function () {
  //   // strategy:
  //   //  1. get a post
  //   //  2. make a DELETE request for that post's id
  //   //  3. assert that response has right status code
  //   //  4. prove that post with the id doesn't exist in db anymore
  //   it('should delete a post by id', function () {
  //
  //     let post;
  //
  //     return Post
  //       .findOne()
  //       .then(_post => {
  //         post = _post;
  //         return chai.request(app).delete(`/api/posts/${post.id}`);
  //       })
  //       .then(res => {
  //         res.should.have.status(204);
  //         return Post.findById(post.id);
  //       })
  //       .then(_post => {
  //         // when a variable's value is null, chaining `should`
  //         // doesn't work. so `_post.should.be.null` would raise
  //         // an error. `should.be.null(_post)` is how we can
  //         // make assertions about a null value.
  //         should.not.exist(_post);
  //       });
  //   });
  // });
});

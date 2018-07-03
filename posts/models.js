'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const uuid = require('uuid');

mongoose.Promise = global.Promise;

const PostSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''},
});

PostSchema.methods.serialize = function() {
  return {
    firstName: this.firstName || '',
    lastName: this.lastName || '',
    email: this.email || ''
  };
};

const Post = mongoose.model('Post', PostSchema);

module.exports = {Post};

/////////////////

// const uuid = require('uuid');
//
// // this module provides volatile storage, using a `BlogPost`
// // model. We haven't learned about databases yet, so for now
// // we're using in-memory storage. This means each time the app stops, our storage
// // gets erased.
//
//
// function StorageException(message) {
//    this.message = message;
//    this.name = "StorageException";
// }
//
// const BlogPosts = {
//   create: function(title, content, author, publishDate) {
//     const post = {
//       id: uuid.v4(),
//       title: title,
//       content: content,
//       author: author,
//       publishDate: publishDate || Date.now()
//     };
//     this.posts.push(post);
//     return post;
//   },
//   get: function(id=null) {
//     // if id passed in, retrieve single post,
//     // otherwise send all posts.
//     if (id !== null) {
//       return this.posts.find(post => post.id === id);
//     }
//     // return posts sorted (descending) by
//     // publish date
//     return this.posts.sort(function(a, b) {
//       return b.publishDate - a.publishDate
//     });
//   },
//   delete: function(id) {
//     const postIndex = this.posts.findIndex(
//       post => post.id === id);
//     if (postIndex > -1) {
//       this.posts.splice(postIndex, 1);
//     }
//   },
//   update: function(updatedPost) {
//     const {id} = updatedPost;
//     const postIndex = this.posts.findIndex(
//       post => post.id === updatedPost.id);
//     if (postIndex === -1) {
//       throw StorageException(
//         `Can't update item \`${id}\` because doesn't exist.`)
//     }
//     this.posts[postIndex] = Object.assign(
//       this.posts[postIndex], updatedPost);
//     return this.posts[postIndex];
//   }
// };
//
// function createBlogPostsModel() {
//   const storage = Object.create(BlogPosts);
//   storage.posts = [];
//   return storage;
// }
// module.exports = {BlogPosts: createBlogPostsModel()};

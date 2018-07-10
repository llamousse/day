"use strict";

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    default: ""
  },
  // type: { type: String, default: "" }, // -> video, description, image, location
  date: {
    type: Date,
    default: Date.now()
  },
  description: {
    type: String,
    default: ""
  }
  // image_url: { type: String, default: "" },
  // video_url: { type: String, default: "" },
  // location: {
  //   lat: { type: String, default: "" },
  //   lon: { type: String, default: "" }
  // }
});

PostSchema.methods.serialize = function() {
  return {
    title: this.title || "",
    date: this.date || Date.now(),
    description: this.description || ""
  };
};

const Post = mongoose.model("Post", PostSchema);

module.exports = { Post };

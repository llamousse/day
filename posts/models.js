"use strict";

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    default: ""
  },
  type: { type: String, default: "" }, // -> video, description, image, location
  date: {
    type: Date,
    default: Date.now()
  },
  description: {
    type: String,
    default: ""
  },
  image_url: { type: String, default: "" },
  video_url: { type: String, default: "" },
  location: {
    lat: { type: String, default: "" },
    lng: { type: String, default: "" }
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

PostSchema.methods.serialize = function() {
  return {
    id: this.id,
    title: this.title || "",
    date: this.date || Date.now(),
    description: this.description || "",
    type: this.type || "",
    image_url: this.image_url || "",
    video_url: this.video_url || "",
    location: this.location || { lat: 0, lng: 0 }
  };
};

const Post = mongoose.model("Post", PostSchema);

module.exports = {Post};

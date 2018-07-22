"use strict";
const express = require("express");
const passport = require('passport');
const bodyParser = require("body-parser");
const { Post } = require("./models");
const router = express.Router();
const jsonParser = bodyParser.json();

const jwtAuth = passport.authenticate("jwt", { session: false });

router.get("/", jwtAuth, (req, res) => {
  Post.find({user: req.user.id}).sort({'date': -1})
  .then(posts => {
    res.json(posts.map(post => post.serialize()));
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: "something went wrong" });
  });
});

router.get("/:id", jwtAuth, (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      res.json(post.serialize())
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went wrong" });
    });
});

router.post("/", jwtAuth, jsonParser, (req, res) => {
  const requiredFields = ["title", "date", "type"];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Post.create({
    title: req.body.title,
    date: req.body.date,
    description: req.body.description,
    type: req.body.type,
    image_url: req.body.image_url,
    video_url: req.body.video_url,
    location: req.body.location,
    user: req.user.id
  })
    .then(Post => res.status(201).json(Post.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went wrong" });
    });
});

router.delete("/:id", jwtAuth, (req, res) => {
  Post.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: "success" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went terribly wrong" });
    });
});

router.put("/:id", jwtAuth, jsonParser, (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: "Request path id and request body id values must match"
    });
  }

  const updated = {};
  const updateableFields = ["title", "date", "description", "type", "image_url", "video_url", "location"];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Post.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedPost => res.status(204).end())
    .catch(err => res.status(500).json({ message: "something went wrong" }));
});

module.exports = { router };

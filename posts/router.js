'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Post} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

// Post to register a new user

// Post routes here

module.exports = {router};

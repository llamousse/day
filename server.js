const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const app = express();
//
// const { testt } = require('./models');
//
app.use(morgan('common'));
app.use(express.static('public'));
//
// // testt.create("Hello World");
//
// app.get('/', (req, res) => {
//
// });
//
app.listen(process.env.PORT || 8080);

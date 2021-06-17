const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const override = require('method-override');
const express = require('express');

const app = express();
const queue = require('./server/api/queue/router');
const err = require('./server/error');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(override());

//queue router
app.use('/queue', queue);

//last middleware to handle all errors
app.use(err());

module.exports = app;

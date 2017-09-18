// load express + adds
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// load mongoose connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:abcd1234@ds137054.mlab.com:37054/webdev', {useMongoClient: true});

// load routes
const index = require('./routes/index');
const users = require('./routes/users');
const challenges = require('./routes/challenges');

// init express app + initial config
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// use routes
app.use('/', index);
app.use('/users', users);
app.use('/challenges', challenges);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message
  });
});

// get port & start listening
const port = process.env.PORT || 5000;
app.listen(port);

module.exports = app;

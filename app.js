// load express + adds
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

// load mongoose connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:abcd1234@ds137054.mlab.com:37054/webdev', {useMongoClient: true});

// load routes
const index = require('./app/routes/index');
const users = require('./app/routes/users');
const challenges = require('./app/routes/challenges');
const problems = require('./app/routes/problems');

// init express app + initial config
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'client/build')));

// use routes
app.use('/', index);
app.use('/users', users);
app.use('/challenges', challenges);
app.use('/problems', problems);

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

// load express + adds
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

// load mongoose connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useMongoClient: true});

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

// use passport + other auth reqs
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie : {secure: false},
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(passport.initialize());
app.use(passport.session());

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

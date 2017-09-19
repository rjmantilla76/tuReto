const passport = require('passport');
const GithubStrategy = require('passport-github2');

// load user model
const User = require('../models/users');

// load oauth credentials + auth init
const init = require('../auth/init');
const config = require('../../config');

// configure passport github strategy
passport.use(new GithubStrategy(config.github, (accessToken, refreshToken, profile, callback) => {
  // define user query & update
  let query = {githubId: profile.id};
  let updates = {name: profile._json.name, avatar: profile._json.avatar_url};

  // exec query update & call cb
  User.findOneAndUpdate(query, updates, {upsert: true}, callback);
}));

// configure serialization
init();

module.exports = passport;

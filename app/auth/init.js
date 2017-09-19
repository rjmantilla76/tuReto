const passport = require('passport');
const User = require('../models/users');

// define common passport behaviour
module.exports = () => {
  // passportjs serialize function
  passport.serializeUser((user, callback) => {
    callback(null, user._id);
  });
  
  // passportjs deserialize function
  passport.deserializeUser((_id, callback) => {
    User.findById(_id, callback);
  });
};

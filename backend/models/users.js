const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  id: String,
  handle: String,
  name: String,
  avatar: String,
  level: Number,
  dailyLimit: Number,
  lastChallenge: Date,
  createdChallenges: Number,
  solvedChallenges: Number,
  createdAt: Date
});

module.exports = mongoose.model('User', userSchema);

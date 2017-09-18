const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  id: String,
  handle: String,
  name: String,
  avatar: String,
  level: {type: Number, default: 0},
  dailyLimit: {type: Number, default: 3},
  lastChallenge: {type: Date, default: undefined},
  createdChallenges: {type: Number, default: 0},
  solvedChallenges: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now},
  githubId: String
});

module.exports = mongoose.model('User', userSchema);

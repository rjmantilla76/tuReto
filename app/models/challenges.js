const mongoose = require('mongoose');

const challengeSchema = mongoose.Schema({
  challenger: {
    id: String,
    name: String,
    handle: String,
    avatar: String
  },
  victim: {
    id: String,
    name: String,
    handle: String,
    avatar: String
  },
  problem: {
    id: String,
    name: String,
    url: String
  },
  solved: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Challenge', challengeSchema);

const express = require('express');
const router = express.Router();

const User = require('../models/users');

// GET retrieves every user
router.get('/', (req, res, next) => {
  // get all users in db
  const fields = ['handle', 'name', 'avatar', 'level'];
  User.find({}, fields, {sort: {handle: 1}}, (err, users) => {
    if (err) return next(err);
    res.json(users);
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();

const auth = require('../auth/middleware');

const User = require('../models/users');

// GET retrieves every user
router.get('/', auth.isAuth, (req, res, next) => {
  // get all users in db
  let fields = ['id', 'handle', 'name', 'avatar', 'level'];
  User.find({}, fields, {sort: {handle: 1}}, (err, users) => {
    if (err) return next(err);
    res.json(users);
  });
});

module.exports = router;

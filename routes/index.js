const express = require('express');
const router = express.Router();

// POST signup a new user
router.post('/signup', (req, res, next) => {
  res.json({});
});

// POST login an existing user
router.post('/login', (req, res, next) => {
    res.json({});
});

// POST logout a user
router.post('/logout', (req, res, next) => {
    res.json({});
});

module.exports = router;

const express = require('express');
const router = express.Router();

const auth = require('../auth/middleware');
const passportGithub = require('../auth/github');

// GET login an existing user
router.get('/login', (req, res) => {
    res.status(401).json({message: 'Go back and register!'});
});

// GET check if user is logged in
router.get('/auth', auth.isAuth, (req, res) => {
  res.json({});
});

// GET begin github authentication
router.get('/auth/github', passportGithub.authenticate('github', {scope: ['user:email']}));

// GET callback for github authentication
router.get('/auth/github/callback', passportGithub.authenticate('github', {failureRedirect: '/login'}), (req, res) => {
  res.json(req.user);
});

// GET logout curr user
router.get('/logout', (req, res, next) => {
  req.session.destroy(_ => res.json({}));
});

module.exports = router;

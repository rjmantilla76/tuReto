const request = require('request');
const express = require('express');
const router = express.Router();

const Challenge = require('../models/challenges');
const User = require('../models/users');

// GET retrieves every active challenge
router.get('/', (req, res, next) => {
  // get all unsolved challenges in db
  const createdLimit = Date.now(); // TODO subtract 48 hours
  Challenge.find({solved: false, createdAt: {$lt: createdLimit}}, null, {sort: {createdAt: -1}}, (err, challenges) => {
    if (err) return next(err);
    res.json(challenges);
  });
})

// POST creates a new challenge
router.post('/', (req, res, next) => {
  // get post params
  const challengerId = req.body.challengerId;
  const victimId = req.body.victimId;
  const problemId = req.body.problemId;
  
  if (!challengerId || !victimId || !problemId) return res.status(400).json({message: 'There\'re missing params!'});
  
  // retrieve both the victim + challenger
  User.find({id: {$in: [challengerId, victimId]}}, (err, users) => {
    if (err) return next(err);
    
    // get the victim & the challenger
    const challenger = users.find(user => user.id === challengerId);
    const victim = users.find(user => user.id === victimId);
    
    if (!challenger || !victim) return res.status(404).json({message: 'Check those user ids!'});
    
    // validate restrictions like same level + daily limit
    if (challenger.level !== victim.level) return res.status(400).json({message: 'You cannot challenge diff level users!'});
    if (challenger.dailyLimit === 0) return res.status(400).json({message: 'No more challenges for today buddy!'});
    
    // retrieve the problem with the given id
    getProblem(problemId, (err, problem) => {
      if (err) return next(err);
  
      // check if the challenger has solved the problem
      hasSolved(challenger.id, problem.pid, (err, solved) => {
        if (err) return next(err);
        if (!solved) return res.json({message: 'You have not solved this challenge yet! What a shame!'});
    
        // create the challenge in the db
        const challenge = new Challenge({
          challenger: {id: challenger.id, name: challenger.name, handle: challenger.handle, avatar: challenger.avatar},
          victim: {id: victim.id, name: victim.name, handle: victim.handle, avatar: victim.avatar},
          problem: {id: problem.pid, name: problem.title, url: problem.url}
        });
        
        challenge.save(err => {
          if (err) return next(err);
          
          // update daily limit + last challenge + created challenges for challenger
          challenger.dailyLimit -= 1;
          challenger.createdChallenges += 1;
          challenger.lastChallenge = Date.now();
          
          challenger.save(err => {
            if (err) return next(err);
            res.json({message: 'Challenge created! Now wait for your victim...'});
          });
        });
      });
    });
  });
});

// PUT sets a challenge as solved if it was really solved
router.put('/:challengeId', (req, res, next) => {
  // find the challenge with the given id
  Challenge.findOne({_id: req.params.challengeId}, (err, challenge) => {
    if (err) return next(err);

    // check if the challenge was really solved
    hasSolved(challenge.victim.id, challenge.problem.id, (err, solved) => {
      if (err) return next(err);
      if (!solved) return res.json({message: 'You have not solved this challenge yet! What a shame!'});
      
      // set the challenge as solved & update
      challenge.solved = true;
      challenge.save(err => {
        if (err) return next(err);
        
        // update victim solved challenged
        User.update({id: challenge.victim.id}, {$inc: {solvedChallenges: 1}}, err => {
          if (err) return next(err);
          res.json({message: 'Challenge accepted. Challenge completed! :notbad:'});
        });
      });
    });
  });
});

// get the problem with the given id
function getProblem(problemId, callback) {
  // get the url for the wanted problem
  const url = `https://uhunt.onlinejudge.org/api/p/id/${problemId}`;
  
  // perform the request to the uhunt api
  request(url, (err, res, body) => {
    if (err || res.statusCode !== 200 || body === '{}') {
      const defaultErr = {message: 'That problem was not found!'};
      return callback(err || defaultErr, null);
    }
    
    // parse the body, add url & go to callback with problem object
    const problem = JSON.parse(body);
    const volume = String(problem.num).substr(0, String(problem.num).length-2);
    problem.url = `https://uva.onlinejudge.org/external/${volume}/${problem.num}.pdf`;
    callback(null, problem);
  })
}

// check if a given user has already solved a given problem
function hasSolved(userId, problemId, callback) {
  // get the url & the accepted status integer code
  const url = `https://uhunt.onlinejudge.org/api/subs-pids/${userId}/${problemId}/0`;
  const accepted = 90;

  // perform the request to the uhunt api
  request(url, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      const defaultErr = {message: `The uhunt server returned status code ${res.statusCode}`};
      return callback(err || defaultErr, false);
    }
    
    // parse the body & go to callback with solved status
    const json = JSON.parse(body);
    const ans = json[userId].subs.some(sub => sub[2] === accepted);
    callback(null, ans);
  });
}

module.exports = router;

const request = require('request');
const express = require('express');
const router = express.Router();

// POST challenge a user to do some problem
router.post('/', (req, res) => {
  // TODO
});

// POST set a problem as solved
router.get('/:userId/problems/:problemId', (req, res) => {
  // get url params
  const userId = req.params.userId;
  const problemId = req.params.problemId;
  
  // check if has solved & answer
  hasSolved(userId, problemId, (err, status) => {
    if (err) {
      res.status(500).json({message: err.message});
    } else {
      res.json({data: status});
    }
  });
});

// check if a given user has already solved a given problem
function hasSolved(userId, problemId, callback) {
  // get the url & the accepted status integer code
  const url = `https://uhunt.onlinejudge.org/api/subs-pids/${userId}/${problemId}/0`;
  const accepted = 90;

  // perform the request to the uhunt api
  request(url, (err, res, body) => {
    if (err || res.status !== 200) {
      console.log(res.status + ' ' + err);
      callback(err, false);
    } else {
      const json = JSON.parse(body);
      console.log(json[userId].subs.filter(sub => sub[2] === accepted));
      const ans = json[userId].subs.some(sub => sub[2] === accepted);
      callback(null, ans);
    }
  });
}

module.exports = router;
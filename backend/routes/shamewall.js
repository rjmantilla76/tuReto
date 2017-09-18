const express = require('express');
const router = express.Router();

// Wall of shame mock 
// Doesn't let me use just '/' and I don't know why
router.get('/shame', (req, res) => {
    // build the users array
  const shameWall = [
    {id: 1, username: "rjman", problemname:"Test", challengeDate: "September 14, 2017 11:13:00", challenger: "jcbages", problemUrl: "http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=3676"},
    {id: 2, username: "rjman", problemname:"Test2", challengeDate: "September 14, 2017 12:13:00", challenger: "jcbages", problemUrl: "http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=3676"},
    {id: 3, username: "diegoN", problemname:"Test3", challengeDate: "September 11, 2017 11:13:00", challenger: "jcbages", problemUrl: "http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=3676"},
    {id: 4, username: "diegoC", problemname:"Test4", challengeDate: "September 11, 2017 11:13:00", challenger: "jcbages", problemUrl: "http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=3676"}
  ];
  
  // answer with the json
  res.json(shameWall);
});

module.exports = router;
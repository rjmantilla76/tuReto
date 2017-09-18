const request = require('request');
const express = require('express');
const router = express.Router();

// GET retrieves every problem
router.get('/', (req, res, next) => {
  // get the uhunt api url
  let url = 'https://uhunt.onlinejudge.org/api/p';

  // perform the request to the uhunt api
  request(url, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      let defaultErr = {message: `The uhunt server returned status code ${res.statusCode}`};
      return next(err || defaultErr);
    }
    
    // parse the body & go to callback with solved status
    let problems = JSON.parse(body).map(problem => ({pid: problem[0], number: problem[1], title: problem[2]}));
    res.json(problems);
  });
})


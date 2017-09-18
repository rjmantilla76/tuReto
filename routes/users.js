const express = require('express');
const router = express.Router();

// GET retrieves every user
router.get('/', (req, res) => {
  // build the users array
  const users = [
    {id: 1, username: "test1"},
    {id: 2, username: "test2"},
    {id: 3, username: "test3"},
    {id: 4, username: "test4"},
    {id: 5, username: "test5"},
  ];
  
  // answer with the json
  res.json({
    data: users
  });
});

module.exports = router;

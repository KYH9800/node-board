const express = require('express');
const router = express.Router();
// schemas/posts
const Posts = require('../schemas/posts');

router.get('/', async (req, res) => {
  const result = await Posts.find({}, { __v: false });
  // console.log('result: ', result);
  res.json({ posts: result });
});

module.exports = router;

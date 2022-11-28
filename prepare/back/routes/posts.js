const express = require('express');
const router = express.Router();
// schemas/posts
const Posts = require('../schemas/posts');

// GET /posts, 게시글 전체 조회
router.get('/', async (req, res) => {
  try {
    const result = await Posts.find({}, { __v: false });
    console.log('전체 조회: ', result);

    res.json({ posts: result });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'error has occured' });
  }
});

// GET /posts/:_postId, 게시글 상세 조회
router.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const result = await Posts.find({ _id: postId }, { __v: false });
    console.log('상세 조회: ', result);

    res.json({ posts: result });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'error has occured' });
  }
});

module.exports = router;

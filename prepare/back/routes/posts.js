const express = require('express');
const router = express.Router();
// schemas/posts
const Posts = require('../schemas/posts');

// GET /posts, 게시글 전체 조회
router.get('/', async (req, res, next) => {
  try {
    const result = await Posts.find(
      {},
      {
        __v: false,
        password: false,
        content: false,
      }
    ).sort({ createdAt: -1 });
    console.log('전체 조회: ', result);
    return res.json({ posts: result });
  } catch (error) {
    console.error('error: ', error);
    next(error);
    return res.status(400).json({ error: '데이터 형식이 올바르지 않습니다.' });
  }
});

// GET /posts/:_postId, 게시글 상세 조회
router.get('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const result = await Posts.find({ _id: postId }, { __v: false, password: false });
    console.log('상세 조회: ', result);

    if (!result.length) {
      return res.status(400).json({ message: '해당 게시글이 존재하지 않습니다.' });
    }

    return res.json({ posts: result });
  } catch (error) {
    console.error('error: ', error);
    next(error);
    return res.status(400).json({
      error: '해당 글이 존재하지 않거나 데이터 형식이 올바르지 않습니다.',
    });
  }
});

module.exports = router;

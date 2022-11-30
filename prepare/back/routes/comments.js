const express = require('express');
const router = express.Router();
// schemas/comments
const Comments = require('../schemas/comments');

// GET/comments/:postId, 댓글 전체 조회
router.get('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const result = await Comments.find(
      {
        postId: postId,
      },
      {
        __v: false,
        password: false,
      }
    ).sort({ createdAt: -1 });
    console.log('댓글 전체: ', result);

    if (!result.length) {
      return res.status(400).json({ message: '해당 게시글이 존재하지 않습니다.' });
    }

    return res.json({ comments: result });
  } catch (error) {
    console.error('error: ', error);
    next(error);
    return res.status(400).json({ error: '데이터 형식이 올바르지 않습니다.' });
  }
});

module.exports = router;

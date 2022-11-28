const express = require('express');
const router = express.Router();
// schemas/comments
const Comments = require('../schemas/comments');

// GET/comments/:postId, 댓글 전체 조회
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  const result = await Comments.find({ postId: postId }, { __v: false, password: false });
  console.log('댓글 전체: ', result);

  res.json({ comments: result });
});

module.exports = router;

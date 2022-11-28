const express = require('express');
const router = express.Router();
// schemas/comments
const Comments = require('../schemas/comments');

// GET/comments, 댓글 전체 조회
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  const result = await Comments.find({}, { __v: false, password: false });
  console.log(result);

  res.json({ comments: result });
});

module.exports = router;

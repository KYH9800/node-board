const express = require('express');
const router = express.Router();
// schemas/comments
const Comments = require('../schemas/comments');
const Posts = require('../schemas/posts');

// POST/comments, 댓글 생성
router.post('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const result = await Posts.find({ _id: postId });
    const { user, password, content } = req.body;
    console.log('comment req.body: ', req.body);
    console.log('postId: ', result);

    if (!content)
      res.status(400).json({
        success: false,
        message: '댓글 내용을 입력해주세요.',
      });

    if (!user)
      res.status(400).json({
        success: false,
        message: '작성자의 닉네임을 입력해주세요.',
      });

    if (!password)
      res.status(400).json({
        success: false,
        message: '비밀번호를 입력해주세요.',
      });

    if (!result.length || !postId)
      res.status(400).json({
        success: false,
        message: '데이터 형식이 올바르지 않습니다.',
      });

    const createdComment = await Comments.create({
      postId,
      user,
      password,
      content,
    });

    res.json({
      message: '댓글을 생성하였습니다.',
      comments: createdComment,
    });
  } catch (error) {
    console.error(error);
  }
});

// PUT/comments, 댓글 수정
router.put('/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;
    const { password, content } = req.body;
    const result = await Comments.find({ _id: commentId });
    console.log('update comments 찾기: ', result);

    if (!content)
      res.status(400).json({
        success: false,
        message: '댓글 내용을 입력해주세요.',
      });

    if (!password)
      res.status(400).json({
        success: false,
        message: '비밀번호를 입력해주세요.',
      });

    if (!commentId)
      res.status(400).json({
        success: false,
        message: '데이터 형식이 올바르지 않습니다.',
      });

    if (!result.length)
      res.status(400).json({
        success: false,
        message: '댓글 조회에 실패하였습니다.',
      });

    if (!result) {
      await Comments.updateOne(
        { _id: postId },
        {
          $set: { password: password, content: content },
        }
      );
    }

    res.json({
      message: '댓글을 수정하였습니다.',
      password,
      content,
    });
  } catch (error) {
    console.error(error);
  }
});

// DELETE/comments, 댓글 삭제
router.delete('/:commentId', async (req, res) => {
  const { commentId } = req.params;
  const result = await Comments.find({ _id: commentId });
  console.log('삭제할 게시글 찾기: ', result);

  if (result.length > 0) {
    await Comments.deleteOne({ _id: commentId });
  }

  res.json({
    message: '게시글을 삭제하였습니다.',
  });
});

module.exports = router;
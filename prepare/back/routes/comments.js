const express = require('express');
const router = express.Router();
// schemas/comments
const Comments = require('../schemas/comment');
const Posts = require('../schemas/post');

// GET/comments/:postId, 댓글 전체 조회
router.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const result = await Comments.find(
      {
        postId: postId,
      },
      {
        password: false,
      }
    ).sort({ createdAt: -1 });
    // console.log('댓글 전체: ', result);

    if (!result.length) {
      return res.status(400).json({ message: '해당 게시글이 존재하지 않습니다.' });
    }

    return res.json({ comments: result });
  } catch (error) {
    console.error('error: ', error);
    return res.status(400).json({ error: '데이터 형식이 올바르지 않습니다.' });
  }
});

// POST/comments/:postId, 댓글 생성
router.post('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    // console.log(postId);
    const result = await Posts.find({ _id: postId });
    const { user, password, content } = req.body;
    // console.log('comment req.body: ', req.body);
    // console.log('postId: ', result);

    if (!content) {
      return res.status(400).json({
        success: false,
        message: '댓글 내용을 입력해주세요.',
      });
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: '작성자의 닉네임을 입력해주세요.',
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: '비밀번호를 입력해주세요.',
      });
    }

    if (!result.length) {
      return res.status(400).json({
        success: false,
        message: '존재하지 않는 게시글 입니다.',
      });
    }

    const createdComment = await Comments.create({
      postId,
      user,
      password,
      content,
    });

    return res.json({
      message: '댓글을 생성하였습니다.',
      comments: createdComment,
    });
  } catch (error) {
    // 공식문서 err 사용하는 메서드 / err custom
    console.error('error: ', error);
    return res.status(400).json({ error: '데이터 형식이 올바르지 않습니다.' });
  }
});

// PUT/comments, 댓글 수정
router.put('/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;
    const { password, content } = req.body;
    const result = await Comments.find({ _id: commentId });
    // console.log('update comments 찾기: ', result);
    if (!content) {
      return res.status(400).json({
        success: false,
        message: '댓글 내용을 입력해주세요.',
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: '비밀번호를 입력해주세요.',
      });
    }

    if (!commentId) {
      return res.status(400).json({
        success: false,
        message: '데이터 형식이 올바르지 않습니다.',
      });
    }

    if (!result.length) {
      return res.status(400).json({
        success: false,
        message: '댓글 조회에 실패하였습니다.',
      });
    }

    if (result.length) {
      await Comments.updateOne(
        { _id: commentId },
        {
          $set: { password: password, content: content },
        }
      );
    }

    return res.json({
      message: '댓글을 수정하였습니다.',
      password,
      content,
    });
  } catch (error) {
    console.error('error: ', error);
    return res.status(400).json({ error: '데이터 형식이 올바르지 않습니다.' });
  }
});

// DELETE/comments, 댓글 삭제
router.delete('/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;
    const result = await Comments.find({ _id: commentId });
    // console.log('삭제할 게시글 찾기: ', result);
    if (result.length > 0) {
      await Comments.deleteOne({ _id: commentId });
    }

    res.json({
      message: '게시글을 삭제하였습니다.',
    });
  } catch (error) {
    console.error('error: ', error);
    return res.status(400).json({ error: '데이터 형식이 올바르지 않습니다.' });
  }
});

module.exports = router;

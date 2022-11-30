const express = require('express');
const router = express.Router();
// schemas/posts
const Posts = require('../schemas/post');

// GET /posts, 게시글 전체 조회
router.get('/', async (req, res) => {
  try {
    const result = await Posts.find(
      {},
      {
        password: false,
        content: false,
      }
    ).sort({ createdAt: -1 });
    // console.log('전체 조회: ', result);
    return res.json({ posts: result });
  } catch (error) {
    console.error('error: ', error);
    return res.status(400).json({ error: '데이터 형식이 올바르지 않습니다.' });
  }
});

// GET /posts/:_postId, 게시글 상세 조회
router.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const result = await Posts.find({ _id: postId }, { password: false });
    // console.log('상세 조회: ', result);
    if (!result.length) {
      return res.status(400).json({ message: '해당 게시글이 존재하지 않습니다.' });
    }

    return res.json({ posts: result });
  } catch (error) {
    console.error('error: ', error);
    return res.status(400).json({
      error: '해당 글이 존재하지 않거나 데이터 형식이 올바르지 않습니다.',
    });
  }
});

// POST/posts, 게시글 생성
router.post('/', async (req, res) => {
  try {
    const { user, password, title, content } = req.body;
    // console.log('req.body: ', req.body);
    if (!user || !password || !title || !content) {
      return res.status(400).json({
        message: '데이터 형식이 올바르지 않습니다.',
      });
    }

    const createdPosts = await Posts.create({
      user,
      password,
      title,
      content,
    });

    return res.json({
      message: '게시글을 생성하였습니다.',
      posts: createdPosts,
    });
  } catch (error) {
    console.error('error: ', error);
    return res.status(400).json({ error: '데이터 형식이 올바르지 않습니다.' });
  }
});

// PATCH/posts, 게시글 수정
router.put('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { password, title, content } = req.body;
    const result = await Posts.find({ _id: postId });
    // console.log('update post 찾기: ', result);
    if (password !== result[0].password) {
      // console.log('result[0].password: ', result[0].password);
      return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    if (result.length) {
      await Posts.updateOne(
        { _id: postId },
        {
          $set: { password: password, title: title, content: content },
        }
      );
    }

    return res.json({
      message: '게시글을 수정하였습니다.',
      password,
      title,
      content,
    });
  } catch (error) {
    console.error('error: ', error);
    return res.status(400).json({ error: '데이터 형식이 올바르지 않습니다.' });
  }
});

// DELETE/posts, 게시글 삭제
router.delete('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { password } = req.body;
    const result = await Posts.find({ _id: postId });
    // console.log('삭제할 게시글 찾기: ', result);
    if (password !== result[0].password) {
      console.log('result[0].password: ', result[0].password);
      return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    if (result.length > 0) {
      await Posts.deleteOne({ _id: postId });
    }

    return res.json({
      message: '게시글을 삭제하였습니다.',
    });
  } catch (error) {
    console.error('error: ', error);
    return res.status(400).json({ error: '데이터 형식이 올바르지 않습니다.' });
  }
});

module.exports = router;

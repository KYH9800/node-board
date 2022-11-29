const express = require('express');
const router = express.Router();
// schemas/posts
const Posts = require('../schemas/posts');

// POST/posts, 게시글 생성
router.post('/', async (req, res, next) => {
  try {
    const { user, password, title, content } = req.body;
    console.log('req.body: ', req.body);

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
    next(error);
    return res.status(400).json({ error: '데이터 형식이 올바르지 않습니다.' });
  }
});

// PATCH/posts, 게시글 수정
router.put('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { password, title, content } = req.body;
    const result = await Posts.find({ _id: postId });
    console.log('update post 찾기: ', result);

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
    next(error);
    return res.status(400).json({ error: '데이터 형식이 올바르지 않습니다.' });
  }
});

// DELETE/posts, 게시글 삭제
router.delete('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const result = await Posts.find({ _id: postId });
    console.log('삭제할 게시글 찾기: ', result);

    if (result.length > 0) {
      await Posts.deleteOne({ _id: postId });
    }

    return res.json({
      message: '게시글을 삭제하였습니다.',
    });
  } catch (error) {
    console.error('error: ', error);
    next(error);
    return res.status(400).json({ error: '데이터 형식이 올바르지 않습니다.' });
  }
});

module.exports = router;

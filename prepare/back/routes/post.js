const express = require('express');
const router = express.Router();
// schemas/posts
const Posts = require('../schemas/posts');

// POST /posts
router.post('/', async (req, res) => {
  const { user, password, title, content } = req.body;

  console.log('req.body: ', req.body);

  if (!user)
    res.status(400).json({
      success: false,
      errorMessage: '데이터 형식이 올바르지 않습니다. user',
    });

  if (!password)
    res.status(400).json({
      success: false,
      errorMessage: '데이터 형식이 올바르지 않습니다. password',
    });

  if (!title)
    res.status(400).json({
      success: false,
      errorMessage: '데이터 형식이 올바르지 않습니다. title',
    });

  if (!content)
    res.status(400).json({
      success: false,
      errorMessage: '데이터 형식이 올바르지 않습니다. content',
    });

  const createdPosts = await Posts.create({
    user,
    password,
    title,
    content,
  });

  res.json({ posts: createdPosts });
});

module.exports = router;

const express = require('express');
const router = express.Router();
// routes
const postsRouter = require('./posts');
const commentsRouter = require('./comments');

router.get('/', (req, res) => {
  res.send('board api start!!');
});

router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);

module.exports = router;

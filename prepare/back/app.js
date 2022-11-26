const express = require('express');
const app = express();
const port = 3000;

// router
const postRouter = require('./components/post');
const allPostsRouter = require('./components/posts');
const commentRouter = require('./components/comment');
const allCommentsRouter = require('./components/comments');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/post', postRouter); // 각각의 게시글 작업
app.use('/api/posts', allPostsRouter); // 모든 게시글 GET
app.use('/api/comment', commentRouter); // 각각의 댓글 작업
app.use('/api/comments', allCommentsRouter); // 모든 댓글 GET

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

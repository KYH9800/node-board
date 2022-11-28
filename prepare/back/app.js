const express = require('express');
const app = express();
const port = 3000;
// cors
let cors = require('cors');
// router
const postRouter = require('./routes/post');
const allPostsRouter = require('./routes/posts');
const commentRouter = require('./routes/comment');
const allCommentsRouter = require('./routes/comments');
// schemas
const connect = require('./schemas');
connect();

// 클라이언트로 부터 받은 http 요청 메시지 형식에서 body데이터를 해석하기 위함
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
  })
);

app.get('/', (req, res) => {
  res.send('board api start!!');
});

app.use('/posts', postRouter); // post work
app.use('/posts', allPostsRouter); // all posts GET
app.use('/comments', commentRouter); // comment work
app.use('/comments', allCommentsRouter); // all comments GET

app.listen(port, () => {
  console.log(port, 'port start!!');
});

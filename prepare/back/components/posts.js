const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('전체 게시글 입니다.');
});

module.exports = router;

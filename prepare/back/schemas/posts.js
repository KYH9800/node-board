const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
  user: {
    type: String, // type은 문자열
    required: true, // 꼭 필요한가?
    // unique: true, // 유니크한 값인가?
  },
  password: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Posts', postsSchema);

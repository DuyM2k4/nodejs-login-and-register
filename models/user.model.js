const mongoose = require('mongoose');

// Định nghĩa schema cho người dùng
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Đảm bảo rằng username là duy nhất
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // Đảm bảo rằng email là duy nhất
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

// Tạo mô hình từ schema
const User = mongoose.model('User', userSchema);

module.exports = User;

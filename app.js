const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = 3000;

// Import route
const userRoutes = require('./routes/userRoutes');

// Hàm khởi động và kết nối đến MongoDB
async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/login-register', {});
    console.log('Connect to MongoDB successfully');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

// Cài đặt EJS là engine template
app.set('view engine', 'ejs');
app.set('views', './views');

// Phân tích dữ liệu gửi từ form
app.use(bodyParser.urlencoded({ extended: false }));

// Cài đặt session middleware
app.use(session({
  secret: 'ăeknfaosdnflwenfsd',
  resave: false,
  saveUninitialized: true
}));

// Sử dụng router
app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Khởi động kết nối MongoDB
main().catch(err => console.error(err));

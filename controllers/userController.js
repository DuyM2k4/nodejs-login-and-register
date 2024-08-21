const User = require('../models/user.model');

// Hiển thị trang đăng ký
exports.showRegisterForm = (req, res) => {
  res.render('register');
};

// Xử lý đăng ký người dùng
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Kiểm tra xem username hoặc password có bị để trống không
    if (!username || !password) {
      return res.status(400).send('Username or password cannot be empty. <<a href="/register">Retry</a>>');
    }

    // Kiểm tra xem username hoặc email đã tồn tại trong cơ sở dữ liệu chưa
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      // Nếu đã tồn tại, gửi thông báo lỗi cho người dùng
      return res.status(400).send('Username or email already exists. <<a href="/register">Retry</a>>');
    }

    // Tạo một đối tượng User mới và lưu vào cơ sở dữ liệu
    const user = new User({ username, email, password });
    await user.save();
    console.log('User registered successfully');
    // Thông báo thành công sau khi đăng ký
    res.status(400).send('Registration Successful!. <<a href="/login">Login</a>>');
  } catch (err) {
    console.error('Error registering user:', err);
    // Nếu có lỗi xảy ra trong quá trình đăng ký, gửi thông báo lỗi cho người dùng
    res.status(500).send('Internal Server Error <<a href="/register">Retry</a>>');
  }
};

// Hiển thị trang đăng nhập
exports.showLoginForm = (req, res) => {
  res.render('login');
};

// Xử lý đăng nhập người dùng
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Tìm người dùng theo username
    const user = await User.findOne({ username });

    // Kiểm tra xem username hoặc password có bị để trống không
    if (!username || !password) {
      return res.status(400).send('Username or password cannot be empty. <<a href="/login">Retry</a>>');
    }

    // Kiểm tra thông tin đăng nhập
    if (user && user.password === password) {
      // Nếu thông tin hợp lệ, lưu thông tin người dùng vào session
      req.session.user = { username: user.username, email: user.email };
      console.log('User logged in successfully');
      // Chuyển hướng đến trang profile sau khi đăng nhập
      res.redirect('/profile');
    } else {
      // Nếu thông tin không hợp lệ, gửi thông báo lỗi cho người dùng
      res.status(401).send('Username or password is incorrect. <<a href="/login">Retry</a>>');
    }
  } catch (err) {
    console.error('Error logging in:', err);
    // Nếu có lỗi xảy ra trong quá trình đăng nhập, gửi thông báo lỗi cho người dùng
    res.status(500).send('Internal Server Error. <<a href="/login">Retry</a>>');
  }
};

// Hiển thị trang profile
exports.showProfile = (req, res) => {
  // Kiểm tra xem người dùng đã đăng nhập chưa
  if (!req.session.user) {
    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    return res.redirect('/login');
  }
  // Hiển thị trang profile với thông tin người dùng
  res.render('profile', {
    username: req.session.user.username,
    email: req.session.user.email
  });
};

// Xử lý đăng xuất
exports.logoutUser = (req, res) => {
  // Xóa session khi người dùng đăng xuất
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
      // Nếu có lỗi xảy ra trong quá trình đăng xuất, gửi thông báo lỗi cho người dùng
      return res.status(500).send('Internal Server Error');
    }
    // Chuyển hướng đến trang đăng nhập sau khi đăng xuất thành công
    res.redirect('/login');
  });
};



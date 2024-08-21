const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes cho đăng ký
router.get('/register', userController.showRegisterForm);
router.post('/register', userController.registerUser);

// Routes cho đăng nhập
router.get('/login', userController.showLoginForm);
router.post('/login', userController.loginUser);

// Route cho trang profile
router.get('/profile', userController.showProfile);

// Route cho đăng xuất
router.get('/logout', userController.logoutUser);

// Route cho trang thành công
router.get('/success', userController.showSuccessPage);

module.exports = router;

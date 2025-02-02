const express = require('express');
const authController = require('../../controllers/admin/authController');
const userController = require('../../controllers/admin/userController');
const router = express.Router();

// User Authentication Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user/me', userController.me);
router.post('/logout', authController.logout);

module.exports = router; 
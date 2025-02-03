const express = require('express');
const authController = require('../../controllers/admin/authController');
const userController = require('../../controllers/admin/userController');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const validateRequest = require('../../middlewares/validateRequest');
const { updateProfileSchema } = require('../../validators/userValidator');
const router = express.Router();

// User Authentication Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user/me', authMiddleware, userController.getProfile);
router.post('/logout', authMiddleware, authController.logout);
router.put('/user/me', 
    authMiddleware,
    validateRequest(updateProfileSchema),
    userController.updateProfile
  );
module.exports = router; 
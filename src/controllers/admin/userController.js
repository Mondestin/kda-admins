const User = require('../../models/User');
const { success, error } = require('../../utils/responseHelper');
const logger = require('../../utils/logger');

/**
 * Get user profile
 * @route GET /user/me
 * @access Private (admin)
 */ 
exports.getProfile = async (req, res) => {
  try {
    // req.user is already attached by authMiddleware
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] } // Exclude sensitive data
    });

    if (!user) {
      logger.warn(`User not found: ID ${req.user.id}`);
      return error(res, 'User not found', 404);
    }

    logger.info(`Profile retrieved for user: ${user.email}`);
    success(res, 'Profile retrieved successfully', user);
  } catch (err) {
    logger.error('Error retrieving user profile:', err);
    error(res, 'Error retrieving profile');
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) {
      logger.warn(`User not found: ID ${req.user.id}`);
      return error(res, 'User not found', 404);
    }

    await user.update({ name, email });
    
    logger.info(`Profile updated for user: ${user.email}`);
    success(res, 'Profile updated successfully', {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    logger.error('Error updating user profile:', err);
    error(res, 'Error updating profile');
  }
};
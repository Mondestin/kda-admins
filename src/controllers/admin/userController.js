const User = require('../../models/User');
const logger = require('../../utils/logger');
const response = require('../../utils/responseHelper');

/**
 * Get user profile
 * @route GET /user/me
 * @access Private (admin)
 */
exports.me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return response.error(res, 'User not found', 404);
    logger.info(`User retrieved: ${user.id}`);
    response.success(res, 'User retrieved successfully', user);

  } catch (error) {
    logger.error('Error fetching user:', error);
    response.error(res, 'Error fetching user');
  }
}
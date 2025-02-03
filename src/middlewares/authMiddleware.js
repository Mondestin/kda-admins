const jwt = require('jsonwebtoken');
const { error } = require('../utils/responseHelper');
const logger = require('../utils/logger');
const Token = require('../models/Token');
const { Op } = require('sequelize');

// Middleware for verifying JWT
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return error(res, 'Unauthorized: No token provided', 401);
  }

  try {
    // First verify the token structure
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token exists in database and is valid
    const tokenRecord = await Token.findOne({
      where: {
        token: token,
        is_revoked: false,
        expires_at: {
          [Op.gt]: new Date() // Check if token hasn't expired
        }
      }
    });

    if (!tokenRecord) {
      logger.warn('Token not found in database or expired');
      return error(res, 'Unauthorized: Invalid or expired token', 401);
    }

    // Attach user data to the request object
    req.user = decoded;
    req.tokenRecord = tokenRecord;
    next();
  } catch (err) {
    logger.error('Token verification failed:', err);
    error(res, 'Unauthorized: Invalid token', 401);
  }
};

// Middleware for role-based access control
const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return error(res, 'Unauthorized: Insufficient permissions', 403);
    }
    next();
  };
};

module.exports = {
  authMiddleware,
  roleMiddleware,
};

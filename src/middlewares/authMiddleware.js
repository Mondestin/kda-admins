const jwt = require('jsonwebtoken');
const { error, success } = require('../utils/responseHelper');
const { log } = require('winston');
const logger = require('../utils/logger');
require('dotenv').config(); // To access environment variables

// Middleware for verifying JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return success(res, 'Unauthorized: No token provided', 401);
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to the request object
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    logger.error('Unauthorized: Invalid token');
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

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Token = require('../../models/Token');
const { success, error } = require('../../utils/responseHelper');
const logger = require('../../utils/logger');
const { Op } = require('sequelize');
const sequelize = require('../../config/database');

require('dotenv').config();

// add swagger annotations here
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return error(res, 'Email is already registered', 400);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(newUser);
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    // Save token to database
    await Token.create({
      user_id: newUser.id,
      token: token,
      expires_at: expiresAt
    });

    logger.info(`User registered successfully: ${email}`);
    success(res, 'User registered successfully', {
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      },
      expires_at: expiresAt
    }, 201);
  } catch (err) {
    logger.error('Error registering user:', err);
    error(res, 'Registration failed');
  }
};

const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email,
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *                 example: 
 *              password:
 *                type: string
 *               example:
 *            required:         
 *             - email
 *             - password
 *    responses:    
 *     200:         
 *      description: User logged in successfully        
 *     content:                     
 *      application/json:       
 *       schema:            
 *       type: object           
 *      properties:     
 *       success:            
 *        type: boolean       
 *       message:             
 *        type: string  
 *       token: 
 *        type: string
 */
exports.login = async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return error(res, 'Invalid credentials', 401);
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return error(res, 'Invalid credentials', 401);
    }

    // Check for existing valid token
    const existingToken = await Token.findOne({
      where: {
        user_id: user.id,
        is_revoked: false,
        expires_at: {
          [Op.gt]: new Date()
        }
      },
      transaction: t
    });

    let token;
    let expiresAt;

    if (existingToken) {
      // Use existing token
      token = existingToken.token;
      expiresAt = existingToken.expires_at;
      logger.info(`Reusing existing token for user: ${user.email}`);
    } else {
      // Revoke all existing tokens for this user
      await Token.update(
        { is_revoked: true },
        { 
          where: { user_id: user.id },
          transaction: t
        }
      );

      // Generate new token
      token = generateToken(user);
      expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1);

      // Save new token to database
      await Token.create({
        user_id: user.id,
        token: token,
        expires_at: expiresAt,
        is_revoked: false
      }, { transaction: t });
      
      logger.info(`Generated new token for user: ${user.email}`);
    }

    await t.commit();

    success(res, 'Login successful', { 
      token, 
      user: { id: user.id, email: user.email, role: user.role },
      expires_at: expiresAt
    });
  } catch (err) {
    await t.rollback();
    logger.error('Login error:', err);
    error(res, 'Login failed');
  }
};

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
exports.logout = async (req, res) => {
  try {
    // Token is already verified by authMiddleware
    const token = req.headers.authorization?.split(' ')[1];
    
    // Revoke the token
    await Token.update(
      { is_revoked: true },
      { 
        where: { 
          token: token,
          user_id: req.user.id // Additional security check
        } 
      }
    );

    logger.info(`User logged out successfully: ${req.user.email}`);
    success(res, 'Logout successful');
  } catch (err) {
    logger.error('Logout error:', err);
    error(res, 'Logout failed');
  }
};

// Add a cleanup function for expired tokens (can be called periodically)
exports.cleanupExpiredTokens = async () => {
  try {
    await Token.destroy({
      where: {
        [Op.or]: [
          { expires_at: { [Op.lt]: new Date() } },
          { is_revoked: true }
        ]
      }
    });
    logger.info('Cleaned up expired tokens');
  } catch (err) {
    logger.error('Token cleanup error:', err);
  }
};
  

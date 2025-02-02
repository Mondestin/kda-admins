const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const response = require('../../utils/responseHelper');
const logger = require('../../utils/logger');

require('dotenv').config();

// add swagger annotations here
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return response.error(res, 'Email is already registered', 400);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate a JWT token
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    logger.error('Error registering user:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during registration',
    });
  }
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
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send the token in a cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    // Respond with the token and user details
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token
    });
  } catch (error) {
    logger.error('Error logging in user:', error);
    response.error(res, 'An error occurred during login', 500);
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
exports.logout = (req, res) => {
    // Clear the 'token' cookie
    res.clearCookie('token');

    // Respond with a success message
    response.success(res, 'User logged out successfully');
  };
  

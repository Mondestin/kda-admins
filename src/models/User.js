const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true, // Primary key
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Name cannot be null
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Email must be unique
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, // Encrypted password
  },
  role: {
    type: DataTypes.ENUM('user', 'admin', 'super-admin'), // Role types
    defaultValue: 'user', // Default role is 'user'
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = User;

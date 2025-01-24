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
    allowNull: false, 
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  role: {
    type: DataTypes.ENUM('transporter','admin', 'super-admin'),
    defaultValue: 'admin', 
  },
}, {
  timestamps: true, 
});

module.exports = User;

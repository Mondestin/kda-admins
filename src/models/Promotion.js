const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Promotion model
const Promotion = sequelize.define('Promotion', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  route_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // Optional: promotion may apply globally
  },
  discount_percentage: {
    type: DataTypes.DECIMAL(5, 2), // Discount percentage
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false, // Promotion start date
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false, // Promotion end date
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true, // Optional description
  },
}, {
  timestamps: true,
});

module.exports = Promotion;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Refund model
const Refund = sequelize.define('Refund', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  payment_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Each refund is linked to a payment
  },
  refund_amount: {
    type: DataTypes.DECIMAL(10, 2), // Amount refunded
    allowNull: false,
  },
  refund_status: {
    type: DataTypes.ENUM('success', 'failed'),
    defaultValue: 'success', // Default refund status
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: false, // Reason for the refund
  },
  transaction_id: {
    type: DataTypes.STRING,
    unique: true, // Refund transaction ID
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Refund;

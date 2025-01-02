const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Payment model
const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  booking_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Each payment is linked to a booking
  },
  transaction_id: {
    type: DataTypes.STRING,
    unique: true, // Transaction ID must be unique
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.ENUM('paypal', 'mobile_money', 'stripe_cash'),
    allowNull: false, // Payment method used
  },
  payment_status: {
    type: DataTypes.ENUM('paid', 'failed', 'refunded'),
    defaultValue: 'paid', // Default payment status
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2), // Payment amount
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Payment;

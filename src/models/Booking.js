const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Booking model
const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // Nullable to allow non-registered users
  },
  ticket_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Each booking is linked to a ticket
  },
  booking_date: {
    type: DataTypes.DATEONLY,
    allowNull: false, // The date of the booking
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'), // Booking statuses
    defaultValue: 'pending',
  },
  payment_status: {
    type: DataTypes.ENUM('paid', 'unpaid'),
    defaultValue: 'unpaid', // Indicates if payment has been made
  },
}, {
  timestamps: true,
});

module.exports = Booking;

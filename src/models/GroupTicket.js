const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the GroupTicket model
const GroupTicket = sequelize.define('GroupTicket', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  route_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Each group ticket must be associated with a route
  },
  group_name: {
    type: DataTypes.STRING,
    allowNull: false, // Name of the group
  },
  total_seats: {
    type: DataTypes.INTEGER,
    allowNull: false, // Total seats booked for the group
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2), // Total price for the group ticket
    allowNull: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = GroupTicket;

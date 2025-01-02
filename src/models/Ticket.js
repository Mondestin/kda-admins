const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Bus = require('./Bus');
const Route = require('./Route');

// Define the Ticket model
const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bus_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Each ticket is associated with a bus
    references: {
      model: Bus,
      key: 'id',
    },
  },
  route_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Each ticket is associated with a route
    references: {
      model: Route,
      key: 'id',
    },
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false, // Price of the ticket
  },
  availability: {
    type: DataTypes.INTEGER,
    allowNull: false, // Available seats for the ticket
    defaultValue: 0,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Ticket;

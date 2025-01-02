const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Bus model
const Bus = sequelize.define('Bus', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bus_company_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Each bus must belong to a company
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Bus name is required
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false, // Total seating capacity
  },
  registration_number: {
    type: DataTypes.STRING,
    unique: true, // Registration number must be unique
    allowNull: false,
  },
  wifi: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Indicates if the bus has WiFi
  },
  toilet: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Indicates if the bus has a toilet
  },
  food: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Indicates if food service is available
  },
  air_conditioning: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Indicates if the bus has air conditioning
  },
  charging_ports: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Indicates if charging ports are available
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true, // Optional description of the bus
  },
}, {
  timestamps: true,
});

module.exports = Bus;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Route model
const Route = sequelize.define('Route', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: false, // Starting point of the route
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false, // Ending point of the route
  },
  distance_km: {
    type: DataTypes.DECIMAL(10, 2), // Distance in kilometers
    allowNull: false,
  },
  estimated_time: {
    type: DataTypes.STRING,
    allowNull: false, // Estimated travel time
  },
  policies: {
    type: DataTypes.TEXT,
    allowNull: true, // Optional policies for the route
  },
}, {
  timestamps: true,
});

module.exports = Route;

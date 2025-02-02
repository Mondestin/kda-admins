const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Amenity = require('./Amenity');

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
  description: {
    type: DataTypes.TEXT,
    allowNull: true, // Optional description of the bus
  },
}, {
  timestamps: true,
  underscored: true,
});

// Define many-to-many relationship
Bus.belongsToMany(Amenity, { 
  through: 'BusAmenities',
  foreignKey: 'bus_id',
  otherKey: 'amenity_id',
  timestamps: true,
  underscored: true
});

Amenity.belongsToMany(Bus, { 
  through: 'BusAmenities',
  foreignKey: 'amenity_id',
  otherKey: 'bus_id',
  timestamps: true,
  underscored: true
});

module.exports = Bus;

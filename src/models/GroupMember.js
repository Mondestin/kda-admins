const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the GroupMember model
const GroupMember = sequelize.define('GroupMember', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  group_ticket_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Each member belongs to a group ticket
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Name of the group member
  },
  contact_number: {
    type: DataTypes.STRING,
    allowNull: true, // Optional contact number for the member
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = GroupMember;

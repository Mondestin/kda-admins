const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Token = sequelize.define('Token', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  token: {
    type: DataTypes.STRING(500),
    allowNull: false,
    unique: true,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  is_revoked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  timestamps: true,
  underscored: true,
});

Token.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Token, { foreignKey: 'user_id' });

module.exports = Token; 
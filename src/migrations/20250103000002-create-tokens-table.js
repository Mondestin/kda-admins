'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tokens', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      token: {
        type: Sequelize.STRING(500),
        allowNull: false,
        unique: true
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      is_revoked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    // Add index for faster token lookups
    await queryInterface.addIndex('Tokens', ['token']);
    await queryInterface.addIndex('Tokens', ['user_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tokens');
  }
}; 
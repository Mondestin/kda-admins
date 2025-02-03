'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // First, revoke all existing tokens
    await queryInterface.sequelize.query(
      'UPDATE Tokens SET is_revoked = true WHERE is_revoked = false'
    );

    // Add indexes for better performance
    await queryInterface.addIndex('Tokens', {
      fields: ['user_id', 'is_revoked', 'expires_at'],
      name: 'idx_tokens_user_status'
    });

    await queryInterface.addIndex('Tokens', {
      fields: ['expires_at'],
      name: 'idx_tokens_expiry'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Tokens', 'idx_tokens_user_status');
    await queryInterface.removeIndex('Tokens', 'idx_tokens_expiry');
  }
}; 
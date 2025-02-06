'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'phone_number', {
      type: Sequelize.STRING(20),
      allowNull: true,
      after: 'email'
    });

    // Add index for phone number lookups
    await queryInterface.addIndex('Users', ['phone_number']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'phone_number');
  }
}; 
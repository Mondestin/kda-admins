'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create Amenities table
    await queryInterface.createTable('Amenities', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
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

    // Create BusAmenities junction table
    await queryInterface.createTable('BusAmenities', {
      bus_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Buses', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false
      },
      amenity_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Amenities', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false
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

    // Add primary key to BusAmenities
    await queryInterface.addConstraint('BusAmenities', {
      fields: ['bus_id', 'amenity_id'],
      type: 'primary key',
      name: 'bus_amenities_pkey'
    });

    // Remove old amenity columns from Buses table
    await queryInterface.removeColumn('Buses', 'wifi');
    await queryInterface.removeColumn('Buses', 'toilet');
    await queryInterface.removeColumn('Buses', 'food');
    await queryInterface.removeColumn('Buses', 'air_conditioning');
    await queryInterface.removeColumn('Buses', 'charging_ports');
  },

  async down(queryInterface, Sequelize) {
    // Add back the old columns
    await queryInterface.addColumn('Buses', 'wifi', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
    await queryInterface.addColumn('Buses', 'toilet', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
    await queryInterface.addColumn('Buses', 'food', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
    await queryInterface.addColumn('Buses', 'air_conditioning', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
    await queryInterface.addColumn('Buses', 'charging_ports', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });

    // Drop the new tables
    await queryInterface.dropTable('BusAmenities');
    await queryInterface.dropTable('Amenities');
  }
}; 
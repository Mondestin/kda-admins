'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Users Table
    await queryInterface.createTable('Users', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(100), allowNull: false },
      email: { type: Sequelize.STRING(150), allowNull: false, unique: true },
      password: { type: Sequelize.STRING(255), allowNull: false },
      role: { type: Sequelize.ENUM('user', 'admin', 'super-admin'), defaultValue: 'user' },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });

    // BusCompanies Table
    await queryInterface.createTable('BusCompanies', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(150), allowNull: false, unique: true },
      contact_info: { type: Sequelize.JSON, allowNull: true },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });

    // Buses Table
    await queryInterface.createTable('Buses', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      bus_company_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'BusCompanies', key: 'id' }, onDelete: 'RESTRICT' },
      name: { type: Sequelize.STRING(100), allowNull: false },
      capacity: { type: Sequelize.INTEGER, allowNull: false },
      registration_number: { type: Sequelize.STRING(50), allowNull: false, unique: true },
      wifi: { type: Sequelize.BOOLEAN, defaultValue: false },
      toilet: { type: Sequelize.BOOLEAN, defaultValue: false },
      food: { type: Sequelize.BOOLEAN, defaultValue: false },
      air_conditioning: { type: Sequelize.BOOLEAN, defaultValue: false },
      charging_ports: { type: Sequelize.BOOLEAN, defaultValue: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });

    // BusPhotos Table
    await queryInterface.createTable('BusPhotos', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      bus_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Buses', key: 'id' }, onDelete: 'RESTRICT' },
      photo_url: { type: Sequelize.STRING(255), allowNull: false },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });

    // Routes Table
    await queryInterface.createTable('Routes', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      origin: { type: Sequelize.STRING(100), allowNull: false },
      destination: { type: Sequelize.STRING(100), allowNull: false },
      distance_km: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      estimated_time: { type: Sequelize.STRING(50), allowNull: false },
      policies: { type: Sequelize.TEXT, allowNull: true },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });

    // RouteStops Table
    await queryInterface.createTable('RouteStops', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      route_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Routes', key: 'id' }, onDelete: 'RESTRICT' },
      stop_name: { type: Sequelize.STRING(100), allowNull: false },
      stop_time: { type: Sequelize.TIME, allowNull: false },
    });

    // Tickets Table
    await queryInterface.createTable('Tickets', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      bus_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Buses', key: 'id' }, onDelete: 'RESTRICT' },
      route_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Routes', key: 'id' }, onDelete: 'RESTRICT' },
      price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      availability: { type: Sequelize.INTEGER, defaultValue: 0 },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });

    // Bookings Table
    await queryInterface.createTable('Bookings', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'Users', key: 'id' }, onDelete: 'SET NULL' },
      ticket_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Tickets', key: 'id' }, onDelete: 'RESTRICT' },
      booking_date: { type: Sequelize.DATEONLY, allowNull: false },
      status: { type: Sequelize.ENUM('pending', 'confirmed', 'cancelled', 'completed'), defaultValue: 'pending' },
      payment_status: { type: Sequelize.ENUM('paid', 'unpaid'), defaultValue: 'unpaid' },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });

    // Payments Table
    await queryInterface.createTable('Payments', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      booking_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Bookings', key: 'id' }, onDelete: 'RESTRICT' },
      transaction_id: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      payment_method: { type: Sequelize.ENUM('paypal', 'mobile_money', 'stripe_cash'), allowNull: false },
      payment_status: { type: Sequelize.ENUM('paid', 'failed', 'refunded'), defaultValue: 'paid' },
      amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });

    // Refunds Table
    await queryInterface.createTable('Refunds', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      payment_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Payments', key: 'id' }, onDelete: 'RESTRICT' },
      refund_amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      refund_status: { type: Sequelize.ENUM('success', 'failed'), defaultValue: 'success' },
      reason: { type: Sequelize.TEXT, allowNull: false },
      transaction_id: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });

    // Promotions Table
    await queryInterface.createTable('Promotions', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      route_id: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'Routes', key: 'id' }, onDelete: 'RESTRICT' },
      discount_percentage: { type: Sequelize.DECIMAL(5, 2), allowNull: false },
      start_date: { type: Sequelize.DATEONLY, allowNull: false },
      end_date: { type: Sequelize.DATEONLY, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });

    // NonRegisteredPassengers Table
    await queryInterface.createTable('NonRegisteredPassengers', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      booking_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Bookings', key: 'id' }, onDelete: 'RESTRICT' },
      name: { type: Sequelize.STRING(100), allowNull: false },
      contact_number: { type: Sequelize.STRING(15), allowNull: true },
    });

    //
    // GroupTickets Table
    await queryInterface.createTable('GroupTickets', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      route_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Routes', key: 'id' }, onDelete: 'RESTRICT' },
      group_name: { type: Sequelize.STRING(100), allowNull: false },
      total_seats: { type: Sequelize.INTEGER, allowNull: false },
      total_price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });

    // GroupMembers Table
    await queryInterface.createTable('GroupMembers', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      group_ticket_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'GroupTickets', key: 'id' }, onDelete: 'CASCADE' },
      name: { type: Sequelize.STRING(100), allowNull: false },
      contact_number: { type: Sequelize.STRING(15), allowNull: true },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },

  async down(queryInterface, Sequelize) {
    // Reverse the order to drop tables
    await queryInterface.dropTable('GroupMembers');
    await queryInterface.dropTable('GroupTickets');
    await queryInterface.dropTable('NonRegisteredPassengers');
    await queryInterface.dropTable('Promotions');
    await queryInterface.dropTable('Refunds');
    await queryInterface.dropTable('Payments');
    await queryInterface.dropTable('Bookings');
    await queryInterface.dropTable('Tickets');
    await queryInterface.dropTable('RouteStops');
    await queryInterface.dropTable('Routes');
    await queryInterface.dropTable('BusPhotos');
    await queryInterface.dropTable('Buses');
    await queryInterface.dropTable('BusCompanies');
    await queryInterface.dropTable('Users');
  },
};

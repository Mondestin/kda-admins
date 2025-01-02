'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

 // Users Table
 await queryInterface.createTable('Users', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false },
  role: { type: Sequelize.ENUM('user', 'admin', 'super-admin'), defaultValue: 'user' },
  created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
});

// Buses Table
await queryInterface.createTable('Buses', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.STRING, allowNull: false },
  capacity: { type: Sequelize.INTEGER, allowNull: false },
  registration_number: { type: Sequelize.STRING, unique: true, allowNull: false },
  wifi: { type: Sequelize.BOOLEAN, defaultValue: false },
  toilet: { type: Sequelize.BOOLEAN, defaultValue: false },
  created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
});

// Routes Table
await queryInterface.createTable('Routes', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  origin: { type: Sequelize.STRING, allowNull: false },
  destination: { type: Sequelize.STRING, allowNull: false },
  distance_km: { type: Sequelize.FLOAT, allowNull: false },
  estimated_time: { type: Sequelize.STRING, allowNull: false },
  policies: { type: Sequelize.TEXT },
  created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
});

// Tickets Table
await queryInterface.createTable('Tickets', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  bus_id: { type: Sequelize.INTEGER, references: { model: 'Buses', key: 'id' }, onDelete: 'RESTRICT' },
  route_id: { type: Sequelize.INTEGER, references: { model: 'Routes', key: 'id' }, onDelete: 'RESTRICT' },
  price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
  availability: { type: Sequelize.INTEGER, allowNull: false },
  created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
});

// Other Tables (Bookings, Payments, Refunds, etc.)
await queryInterface.createTable('Bookings', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: Sequelize.INTEGER, references: { model: 'Users', key: 'id' }, onDelete: 'SET NULL' },
  ticket_id: { type: Sequelize.INTEGER, references: { model: 'Tickets', key: 'id' }, onDelete: 'RESTRICT' },
  booking_date: { type: Sequelize.DATE, allowNull: false },
  status: { type: Sequelize.ENUM('pending', 'confirmed', 'cancelled', 'completed'), defaultValue: 'pending' },
  payment_status: { type: Sequelize.ENUM('paid', 'unpaid'), defaultValue: 'unpaid' },
  created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
});

// Payments Table
await queryInterface.createTable('Payments', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  booking_id: { type: Sequelize.INTEGER, references: { model: 'Bookings', key: 'id' }, onDelete: 'RESTRICT' },
  transaction_id: { type: Sequelize.STRING, allowNull: false, unique: true },
  payment_method: { type: Sequelize.ENUM('paypal', 'mobile_money', 'stripe_cash'), allowNull: false },
  payment_status: { type: Sequelize.ENUM('paid', 'failed', 'refunded'), defaultValue: 'paid' },
  amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
  created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
});

// Refunds Table
await queryInterface.createTable('Refunds', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  payment_id: { type: Sequelize.INTEGER, references: { model: 'Payments', key: 'id' }, onDelete: 'RESTRICT' },
  refund_amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
  refund_status: { type: Sequelize.ENUM('success', 'failed'), defaultValue: 'success' },
  reason: { type: Sequelize.TEXT, allowNull: false },
  transaction_id: { type: Sequelize.STRING, allowNull: false, unique: true },
  created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
});

// Promotions Table
await queryInterface.createTable('Promotions', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  route_id: { type: Sequelize.INTEGER, references: { model: 'Routes', key: 'id' }, onDelete: 'RESTRICT' },
  discount_percentage: { type: Sequelize.DECIMAL(5, 2), allowNull: false },
  start_date: { type: Sequelize.DATEONLY, allowNull: false },
  end_date: { type: Sequelize.DATEONLY, allowNull: false },
  description: { type: Sequelize.TEXT, allowNull: true },
  created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
});

// GroupTickets Table
await queryInterface.createTable('GroupTickets', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  route_id: { type: Sequelize.INTEGER, references: { model: 'Routes', key: 'id' }, onDelete: 'RESTRICT' },
  group_name: { type: Sequelize.STRING, allowNull: false },
  total_seats: { type: Sequelize.INTEGER, allowNull: false },
  total_price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
  created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
});

// GroupMembers Table
await queryInterface.createTable('GroupMembers', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  group_ticket_id: { type: Sequelize.INTEGER, references: { model: 'GroupTickets', key: 'id' }, onDelete: 'CASCADE' },
  name: { type: Sequelize.STRING, allowNull: false },
  contact_number: { type: Sequelize.STRING, allowNull: true },
  created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
});


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Import models
const User = require('./User');
const Bus = require('./Bus');
const Route = require('./Route');
const Ticket = require('./Ticket');
const Booking = require('./Booking');
const Payment = require('./Payment');
const Refund = require('./Refund');
const Promotion = require('./Promotion');
const GroupTicket = require('./GroupTicket');
const GroupMember = require('./GroupMember');

// Define relationships
// 1. User to Booking
User.hasMany(Booking, { foreignKey: 'user_id', onDelete: 'SET NULL' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

// 2. Bus to Ticket
Bus.hasMany(Ticket, { foreignKey: 'bus_id', onDelete: 'RESTRICT' });
Ticket.belongsTo(Bus, { foreignKey: 'bus_id' });

// 3. Route to Ticket
Route.hasMany(Ticket, { foreignKey: 'route_id', onDelete: 'RESTRICT' });
Ticket.belongsTo(Route, { foreignKey: 'route_id' });

// 4. Route to Promotion
Route.hasMany(Promotion, { foreignKey: 'route_id', onDelete: 'RESTRICT' });
Promotion.belongsTo(Route, { foreignKey: 'route_id' });

// 5. Ticket to Booking
Ticket.hasMany(Booking, { foreignKey: 'ticket_id', onDelete: 'RESTRICT' });
Booking.belongsTo(Ticket, { foreignKey: 'ticket_id' });

// 6. Booking to Payment
Booking.hasMany(Payment, { foreignKey: 'booking_id', onDelete: 'RESTRICT' });
Payment.belongsTo(Booking, { foreignKey: 'booking_id' });

// 7. Payment to Refund
Payment.hasOne(Refund, { foreignKey: 'payment_id', onDelete: 'RESTRICT' });
Refund.belongsTo(Payment, { foreignKey: 'payment_id' });

// 8. Route to GroupTicket
Route.hasMany(GroupTicket, { foreignKey: 'route_id', onDelete: 'RESTRICT' });
GroupTicket.belongsTo(Route, { foreignKey: 'route_id' });

// 9. GroupTicket to GroupMember
GroupTicket.hasMany(GroupMember, { foreignKey: 'group_ticket_id', onDelete: 'CASCADE' });
GroupMember.belongsTo(GroupTicket, { foreignKey: 'group_ticket_id' });

// Export models and Sequelize instance
module.exports = {
  sequelize,
  Sequelize,
  User,
  Bus,
  Route,
  Ticket,
  Booking,
  Payment,
  Refund,
  Promotion,
  GroupTicket,
  GroupMember,
};

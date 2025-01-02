const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Import all models
const User = require('./User');
const Bus = require('./Bus');
const Route = require('./Route');
const Booking = require('./Booking');
const Payment = require('./Payment');
const Refund = require('./Refund');
const Promotion = require('./Promotion');
const GroupTicket = require('./GroupTicket');
const GroupMember = require('./GroupMember');
const Ticket = require('./Ticket');

// Relationships
// 1. User to Booking
User.hasMany(Booking, { foreignKey: 'user_id', onDelete: 'SET NULL' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

// 2. Bus to Routes
Bus.hasMany(Route, { foreignKey: 'bus_company_id', onDelete: 'RESTRICT' });
Route.belongsTo(Bus, { foreignKey: 'bus_company_id' });

// 3. Route to Promotions
Route.hasMany(Promotion, { foreignKey: 'route_id', onDelete: 'RESTRICT' });
Promotion.belongsTo(Route, { foreignKey: 'route_id' });

// 4. Route to Bookings (via Tickets)
Route.hasMany(Booking, { foreignKey: 'ticket_id' });
Booking.belongsTo(Route, { foreignKey: 'ticket_id' });

// 5. Booking to Payments
Booking.hasMany(Payment, { foreignKey: 'booking_id', onDelete: 'RESTRICT' });
Payment.belongsTo(Booking, { foreignKey: 'booking_id' });

// 6. Payment to Refund
Payment.hasOne(Refund, { foreignKey: 'payment_id', onDelete: 'RESTRICT' });
Refund.belongsTo(Payment, { foreignKey: 'payment_id' });

// 7. Bus to Tickets
Bus.hasMany(Booking, { foreignKey: 'ticket_id' });
Booking.belongsTo(Bus, { foreignKey: 'ticket_id' });

// 8. GroupTicket to Route
GroupTicket.hasMany(GroupMember, { foreignKey: 'group_ticket_id', onDelete: 'CASCADE' });
GroupMember.belongsTo(GroupTicket, { foreignKey: 'group_ticket_id' });

// 9. Ticket Relationships
Ticket.belongsTo(Bus, { foreignKey: 'bus_id', onDelete: 'RESTRICT' });
Ticket.belongsTo(Route, { foreignKey: 'route_id', onDelete: 'RESTRICT' });


// Export all models
module.exports = {
  sequelize,
  User,
  Bus,
  Route,
  Booking,
  Payment,
  Refund,
  Promotion,
  GroupTicket,
  GroupMember,
  Ticket
};

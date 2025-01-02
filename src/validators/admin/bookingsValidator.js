const Joi = require('joi');

// Schema for validating admin bookings
const bookingSchema = Joi.object({
  user_id: Joi.number().integer().optional(),
  ticket_id: Joi.number().integer().required(),
  booking_date: Joi.date().iso().required(),
  status: Joi.string().valid('pending', 'confirmed', 'cancelled', 'completed').optional(),
  payment_status: Joi.string().valid('paid', 'unpaid').optional(),
});

module.exports = {
  bookingSchema,
};

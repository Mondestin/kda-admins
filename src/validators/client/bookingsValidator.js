const Joi = require('joi');

// Schema for validating client bookings
const clientBookingSchema = Joi.object({
  ticket_id: Joi.number().integer().required(),
  booking_date: Joi.date().iso().required(),
});

module.exports = {
  clientBookingSchema,
};

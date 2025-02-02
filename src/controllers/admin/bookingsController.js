const { Op } = require('sequelize');
const Booking = require('../../models/Booking');
const Payment = require('../../models/Payment');
const logger = require('../../utils/logger');
const { success, error } = require('../../utils/responseHelper');

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    logger.info('Fetched all bookings');
    success(res, 'Bookings retrieved successfully', bookings);
  } catch (err) {
    logger.error('Error fetching bookings:', err);
    error(res, 'Error fetching bookings');
  }
};

// Get a single booking by ID
exports.getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByPk(id);
    if (!booking) return error(res, 'Booking not found', 404);
    success(res, 'Booking retrieved successfully', booking);
  } catch (err) {
    logger.error('Error fetching booking:', err);
    error(res, 'Error fetching booking');
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    logger.info(`New booking created with ID: ${newBooking.id}`);
    success(res, 'Booking created successfully', newBooking);
  } catch (err) {
    logger.error('Error creating booking:', err);
    error(res, 'Error creating booking');
  }
};

// Update an existing booking
exports.updateBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByPk(id);
    if (!booking) return error(res, 'Booking not found', 404);
    
    await booking.update(req.body);
    logger.info(`Booking updated: ID ${id}`);
    success(res, 'Booking updated successfully', booking);
  } catch (err) {
    logger.error('Error updating booking:', err);
    error(res, 'Error updating booking');
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByPk(id);
    if (!booking) return error(res, 'Booking not found', 404);

    await booking.destroy();
    logger.info(`Booking deleted: ID ${id}`);
    success(res, 'Booking deleted successfully');
  } catch (err) {
    logger.error('Error deleting booking:', err);
    error(res, 'Error deleting booking');
  }
};

// Accept cash payment for a booking
exports.acceptCashPayment = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      logger.warn(`Booking not found: ID ${bookingId}`);
      return error(res, 'Booking not found', 404);
    }

    if (booking.payment_status === 'paid') {
      return error(res, 'Booking has already been marked as paid', 400);
    }

    const payment = await Payment.create({
      booking_id: booking.id,
      transaction_id: `CASH-${Date.now()}`,
      payment_method: 'stripe_cash',
      payment_status: 'paid',
      amount: booking.total_price || 0,
    });

    await booking.update({ payment_status: 'paid' });

    logger.info(`Cash payment accepted for booking ID ${bookingId}`);
    success(res, 'Cash payment accepted', { booking, payment });
  } catch (err) {
    logger.error(`Error accepting cash payment for booking ID ${bookingId}:`, err);
    error(res, 'Error processing cash payment');
  }
};
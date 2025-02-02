const { Op } = require('sequelize');
const Booking = require('../../models/Booking');
const Payment = require('../../models/Payment');
const logger = require('../../utils/logger'); // Optional: Use for logging
const { success, error } = require('../../utils/responseHelper');
const e = require('express');

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    logger.info('Fetched all bookings', bookings);
    success(res, 'Bookings retrieved successfully', bookings);

  } catch (error) {
    logger.error('Error fetching bookings:', error);
    error(res, 'Error fetching bookings');
  }
};

// Get a single booking by ID
exports.getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return error(res, 'Booking not found', 404);
    }
    success(res, 'Booking retrieved successfully', booking);
  } catch (error) {
    logger.error('Error fetching booking:', error); 
    error(res, 'Error fetching booking');
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
  const { user_id, ticket_id, booking_date, status, payment_status } = req.body;
  try {
    const newBooking = await Booking.create({
      user_id,
      ticket_id,
      booking_date,
      status,
      payment_status,
    });
    res.status(201).json({
      success: true,
      data: newBooking,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
    });
  }
};

// Update an existing booking
exports.updateBooking = async (req, res) => {
  const { id } = req.params;
  const { user_id, ticket_id, booking_date, status, payment_status } = req.body;
  try {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    await booking.update({
      user_id,
      ticket_id,
      booking_date,
      status,
      payment_status,
    });

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating booking',
    });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    await booking.destroy();

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting booking',
    });
  }
};


// Accept cash payment for a booking
exports.acceptCashPayment = async (req, res) => {
  const { bookingId } = req.params;

  try {
    // Fetch the booking by ID
    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
      logger.warn(`Booking not found: ID ${bookingId}`);
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    if (booking.payment_status === 'paid') {
      return res.status(400).json({
        success: false,
        message: 'Booking has already been marked as paid',
      });
    }

    // Create a payment record for the cash payment
    const payment = await Payment.create({
      booking_id: booking.id,
      transaction_id: `CASH-${Date.now()}`, // Generate a unique transaction ID
      payment_method: 'stripe_cash', // Assuming 'stripe_cash' is used for cash payments
      payment_status: 'paid',
      amount: booking.total_price || 0, // Use the total price from the booking (ensure it's part of the model)
    });

    // Update the booking's payment status to "paid"
    await booking.update({ payment_status: 'paid' });

    logger.info(`Cash payment accepted for booking ID ${bookingId}`);
    res.status(200).json({
      success: true,
      message: 'Cash payment accepted',
      data: {
        booking,
        payment,
      },
    });
  } catch (error) {
    logger.error(`Error accepting cash payment for booking ID ${bookingId}:`, error);
    res.status(500).json({
      success: false,
      message: 'Error processing cash payment',
    });
  }
};
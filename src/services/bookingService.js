const Booking = require('../models/Booking');
const Ticket = require('../models/Ticket');

exports.createBooking = async (userId, ticketId, bookingDate, status = 'pending') => {
  try {
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket || ticket.availability <= 0) {
      throw new Error('Ticket is unavailable');
    }

    const booking = await Booking.create({
      user_id: userId,
      ticket_id: ticketId,
      booking_date: bookingDate,
      status,
    });

    // Reduce ticket availability
    await ticket.update({ availability: ticket.availability - 1 });

    return booking;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw new Error('Failed to create booking');
  }
};

exports.cancelBooking = async (bookingId) => {
  try {
    const booking = await Booking.findByPk(bookingId);
    if (!booking || booking.status === 'cancelled') {
      throw new Error('Booking not found or already cancelled');
    }

    // Update booking status
    await booking.update({ status: 'cancelled' });

    // Restore ticket availability
    const ticket = await Ticket.findByPk(booking.ticket_id);
    if (ticket) {
      await ticket.update({ availability: ticket.availability + 1 });
    }

    return booking;
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw new Error('Failed to cancel booking');
  }
};

exports.getBookingDetails = async (bookingId) => {
  try {
    const booking = await Booking.findByPk(bookingId, {
      include: ['User', 'Ticket'],
    });
    if (!booking) throw new Error('Booking not found');
    return booking;
  } catch (error) {
    console.error('Error fetching booking details:', error);
    throw new Error('Failed to fetch booking details');
  }
};

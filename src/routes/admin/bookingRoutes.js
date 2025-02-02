const express = require('express');
const bookingsController = require('../../controllers/admin/bookingsController');
const router = express.Router();

// Admin bookings routes
router.get('/', bookingsController.getBookings);
router.post('/', bookingsController.createBooking);
router.get('/:bookingId', bookingsController.getBookingById);
router.put('/:bookingId', bookingsController.updateBooking);
router.delete('/:bookingId', bookingsController.deleteBooking);
router.put('/:bookingId/accept-cash', bookingsController.acceptCashPayment);

module.exports = router; 
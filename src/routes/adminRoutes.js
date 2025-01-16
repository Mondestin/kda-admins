const express = require('express');
const bookingsController = require('../controllers/admin/bookingsController');
const busesController = require('../controllers/admin/busesController');
const routesController = require('../controllers/admin/routesController');
const paymentsController = require('../controllers/admin/paymentsController');

const router = express.Router();

// Admin bookings routes
router.get('/bookings', bookingsController.getBookings);
router.post('/bookings', bookingsController.createBooking);
router.get('/bookings/:bookingId', bookingsController.getBookingById);
router.put('/bookings/:bookingId', bookingsController.updateBooking);
router.delete('/bookings/:bookingId', bookingsController.deleteBooking);
router.put('/bookings/:bookingId/accept-cash', bookingsController.acceptCashPayment);

// Admin buses routes
router.get('/buses', busesController.getBuses);
router.post('/buses', busesController.createBus);
router.get('/buses/:busId', busesController.getBusById);
router.put('/buses/:busId', busesController.updateBus);
router.delete('/buses/:busId', busesController.deleteBus);

// Admin routes management
router.get('/routes', routesController.getRoutes);
router.post('/routes', routesController.createRoute);
router.get('/routes/:routeId', routesController.getRouteById);
router.put('/routes/:routeId', routesController.updateRoute);
router.delete('/routes/:routeId', routesController.deleteRoute);


// Admin payments
router.post('/bookings/:bookingId/pay', paymentsController.processPayment);
router.post('/bookings/:bookingId/refund', paymentsController.initiateRefund);

module.exports = router;

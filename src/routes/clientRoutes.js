const express = require('express');
const bookingsController = require('../controllers/client/bookingsController');
const searchController = require('../controllers/client/searchController');
const promotionsController = require('../controllers/client/promotionsController');
const authController = require('../controllers/client/authController');

const router = express.Router();

// Client bookings routes
router.get('/bookings', bookingsController.getUserBookings);
router.post('/bookings', bookingsController.createBooking);
router.put('/bookings/cancel', bookingsController.cancelBooking);

// Client search routes
router.get('/search/buses', searchController.searchBuses);

// Client promotions routes
router.get('/promotions', promotionsController.getPromotions);

// User Authentication Routes
router.post('/register', authController.register); // Registration route
router.post('/login', authController.login); 

module.exports = router;

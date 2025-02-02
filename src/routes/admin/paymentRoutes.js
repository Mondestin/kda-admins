const express = require('express');
const paymentsController = require('../../controllers/admin/paymentsController');
const router = express.Router();

// Admin payments
router.post('/bookings/:bookingId/pay', paymentsController.processPayment);
router.post('/bookings/:bookingId/refund', paymentsController.initiateRefund);

module.exports = router; 
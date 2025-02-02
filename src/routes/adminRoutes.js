const express = require('express');
const router = express.Router();

// Import route modules
const bookingRoutes = require('./admin/bookingRoutes');
const busRoutes = require('./admin/busRoutes');
const routeRoutes = require('./admin/routeRoutes');
const paymentRoutes = require('./admin/paymentRoutes');
const authRoutes = require('./admin/authRoutes');

// Mount routes
router.use('/bookings', bookingRoutes);
router.use('/buses', busRoutes);
router.use('/routes', routeRoutes);
router.use('/payments', paymentRoutes);
router.use('/auth', authRoutes);

module.exports = router;
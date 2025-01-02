const express = require('express');
const commonController = require('../controllers/commonController');

const router = express.Router();

// Health Check
router.get('/health', commonController.healthCheck);

// API Information
router.get('/info', commonController.getApiInfo);

// 404 Fallback for Undefined Routes
router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

module.exports = router;

const express = require('express');
const busesController = require('../../controllers/admin/busesController');
const router = express.Router();

// Admin buses routes
router.get('/', busesController.getBuses);
router.post('/', busesController.createBus);
router.get('/:busId', busesController.getBusById);
router.put('/:busId', busesController.updateBus);
router.delete('/:busId', busesController.deleteBus);

module.exports = router; 
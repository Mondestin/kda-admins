const express = require('express');
const busesController = require('../../controllers/admin/busesController');
const validateRequest = require('../../middlewares/validateRequest');
const { busSchema, busIdSchema, busUpdateSchema } = require('../../validators/admin/busesValidator');
const router = express.Router();

// Admin buses routes
router.get('/', busesController.getBuses);

router.post('/', 
  validateRequest(busSchema),
  busesController.createBus
);

router.get('/:busId', 
  validateRequest(busIdSchema, 'params'),
  busesController.getBusById
);

router.put('/:busId', 
  validateRequest(busIdSchema, 'params'),
  validateRequest(busUpdateSchema),
  busesController.updateBus
);

router.delete('/:busId', 
  validateRequest(busIdSchema, 'params'),
  busesController.deleteBus
);

module.exports = router; 
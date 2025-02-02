const express = require('express');
const routesController = require('../../controllers/admin/routesController');
const router = express.Router();

// Admin routes management
router.get('/', routesController.getRoutes);
router.post('/', routesController.createRoute);
router.get('/:routeId', routesController.getRouteById);
router.put('/:routeId', routesController.updateRoute);
router.delete('/:routeId', routesController.deleteRoute);

module.exports = router; 
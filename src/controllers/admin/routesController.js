const Route = require('../../models/Route');
const logger = require('../../utils/logger');
const { success, error } = require('../../utils/responseHelper');
const { formatDate } = require('../../utils/dateHelper');

// Get all routes
exports.getRoutes = async (req, res) => {
  try {
    const routes = await Route.findAll();
    success(res, 'Routes retrieved successfully', routes);
    logger.info('Fetched all routes');
  } catch (err) {
    logger.error('Error fetching routes:', err);
    error(res, 'Error fetching routes');
  }
};

// Get a single route by ID
exports.getRouteById = async (req, res) => {
  const { routeId } = req.params;
  try {
    const route = await Route.findByPk(routeId);

    if (!route) {
      logger.warn(`Route not found: ID ${routeId}`);
      return error(res, 'Route not found', 404);
    }

    success(res, 'Route retrieved successfully', route);
    logger.info(`Fetched route with ID ${routeId}`);
  } catch (err) {
    logger.error(`Error fetching route with ID ${routeId}:`, err);
    error(res, 'Error fetching route');
  }
};

// Create a new route
exports.createRoute = async (req, res) => {
  const { origin, destination, distance_km, estimated_time, policies } = req.body;
  try {
    const newRoute = await Route.create({
      origin,
      destination,
      distance_km,
      estimated_time,
      policies,
      created_at: formatDate(new Date()),
    });

    success(res, 'Route created successfully', newRoute);
    logger.info(`Route created: ${newRoute.id}`);
  } catch (err) {
    logger.error('Error creating route:', err);
    error(res, 'Error creating route');
  }
};

// Update an existing route
exports.updateRoute = async (req, res) => {
  const { routeId } = req.params;
  const { origin, destination, distance_km, estimated_time, policies } = req.body;

  try {
    const route = await Route.findByPk(routeId);

    if (!route) {
      logger.warn(`Route not found: ID ${routeId}`);
      return error(res, 'Route not found', 404);
    }

    await route.update({
      origin,
      destination,
      distance_km,
      estimated_time,
      policies,
      updated_at: formatDate(new Date()),
    });

    success(res, 'Route updated successfully', route);
    logger.info(`Route updated: ID ${routeId}`);
  } catch (err) {
    logger.error(`Error updating route with ID ${routeId}:`, err);
    error(res, 'Error updating route');
  }
};

// Delete a route
exports.deleteRoute = async (req, res) => {
  const { routeId } = req.params;

  try {
    const route = await Route.findByPk(routeId);

    if (!route) {
      logger.warn(`Route not found: ID ${routeId}`);
      return error(res, 'Route not found', 404);
    }

    await route.destroy();

    success(res, 'Route deleted successfully');
    logger.info(`Route deleted: ID ${routeId}`);
  } catch (err) {
    logger.error(`Error deleting route with ID ${routeId}:`, err);
    error(res, 'Error deleting route');
  }
};

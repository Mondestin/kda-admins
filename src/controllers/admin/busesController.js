const Bus = require('../../models/Bus');
const { success, error } = require('../../utils/responseHelper');
const logger = require('../../utils/logger');


/**
 * @swagger
 * /buses:
 *   get:
 *     summary: Get all buses
 *     tags: [Admin/Buses]
 *     responses:
 *       200:
 *         description: Fetched all buses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bus'
 */

exports.getBuses = async (req, res) => {
  try {
    const buses = await Bus.findAll();

    logger.info('Fetched all buses');
    success(res, 'Buses retrieved successfully', buses);
  } catch (error) {
    logger.error('Error fetching buses:', error);
    error(res, 'Error fetching buses'); 
  }
};

/**
 * @swagger
 * /buses:
 *   post:
 *     summary: Create a new bus
 *     tags: [Admin/Buses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       201:
 *         description: Bus created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       500:
 *         description: Error creating bus
 */

exports.createBus = async (req, res) => {
  console.log(req.body);
  try {
    const newBus = await Bus.create(req.body);
    success(res, 'Bus created successfully', newBus);
  } catch (error) {
    error(res, 'Error creating bus');
  }
};

/**
 * @swagger
 * /buses/{busId}:
 *   get:
 *     summary: Get a single bus by ID
 *     tags: [Admin/Buses]
 *     parameters:
 *       - in: path
 *         name: busId
 *         required: true
 *         description: ID of the bus to fetch
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bus retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       404:
 *         description: Bus not found
 */

exports.getBusById = async (req, res) => {
  const { busId } = req.params;
  try {
    const bus = await Bus.findByPk(busId);
    if (!bus) return error(res, 'Bus not found', 404);
    success(res, 'Bus retrieved successfully', bus);
  } catch (error) {
    error(res, 'Error fetching bus');
  }
};

/**
 * @swagger
 * /buses/{busId}:
 *   put:
 *     summary: Update an existing bus by ID
 *     tags: [Admin/Buses]
 *     parameters:
 *       - in: path
 *         name: busId
 *         required: true
 *         description: ID of the bus to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       200:
 *         description: Bus updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       404:
 *         description: Bus not found
 *       500:
 *         description: Error updating bus
 */

exports.updateBus = async (req, res) => {
  const { busId } = req.params;
  try {
    const bus = await Bus.findByPk(busId);
    if (!bus) return error(res, 'Bus not found', 404);
    await bus.update(req.body);
    success(res, 'Bus updated successfully', bus);
  } catch (error) {
    error(res, 'Error updating bus'); 
  }
};

/**
 * @swagger
 * /buses/{busId}:
 *   delete:
 *     summary: Delete a bus by ID
 *     tags: [Admin/Buses]
 *     parameters:
 *       - in: path
 *         name: busId
 *         required: true
 *         description: ID of the bus to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bus deleted successfully
 *       404:
 *         description: Bus not found
 *       500:
 *         description: Error deleting bus
 */

exports.deleteBus = async (req, res) => {
  const { busId } = req.params;
  try {
    const bus = await Bus.findByPk(busId);
    if (!bus) return error(res, 'Bus not found', 404);  
    await bus.destroy();
    success(res, 'Bus deleted successfully');
  } catch (error) {
    error(res, 'Error deleting bus');
  }
};

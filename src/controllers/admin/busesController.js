const Bus = require('../../models/Bus');

// Get all buses
exports.getBuses = async (req, res) => {
  try {
    const buses = await Bus.findAll();
    console.log(buses);
    res.status(200).json({ success: true, data: buses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching buses' });
  }
};

// Create a new bus
exports.createBus = async (req, res) => {
  console.log(req.body);
  try {
    const newBus = await Bus.create(req.body);
    res.status(201).json({ success: true, data: newBus });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating bus' });
  }
};

// Get a single bus by ID
exports.getBusById = async (req, res) => {
  const { busId } = req.params;
  try {
    const bus = await Bus.findByPk(busId);
    if (!bus) return res.status(404).json({ success: false, message: 'Bus not found' });
    res.status(200).json({ success: true, data: bus });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching buse' });
  }
};

// Update an existing bus
exports.updateBus = async (req, res) => {
  const { busId } = req.params;
  try {
    const bus = await Bus.findByPk(busId);
    if (!bus) return res.status(404).json({ success: false, message: 'Bus not found' });
    await bus.update(req.body);
    res.status(200).json({ success: true, data: bus });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating bus' });
  }
};

// Delete an existing bus
exports.deleteBus = async (req, res) => {
  const { busId } = req.params;
  try {
    const bus = await Bus.findByPk(busId);
    if (!bus) return res.status(404).json({ success: false, message: 'Bus not found' });
    await bus.destroy();
    res.status(200).json({ success: true, message: 'Bus deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting bus' });
  }
};

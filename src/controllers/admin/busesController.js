const Bus = require('../../models/Bus');

exports.getBuses = async (req, res) => {
  try {
    const buses = await Bus.findAll();
    console.log(buses);
    res.status(200).json({ success: true, data: buses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching buses' });
  }
};

exports.createBus = async (req, res) => {
  try {
    const newBus = await Bus.create(req.body);
    res.status(201).json({ success: true, data: newBus });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating bus' });
  }
};

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

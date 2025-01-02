const Bus = require('../../models/Bus');
const Route = require('../../models/Route');

exports.searchBuses = async (req, res) => {
  const { from, to, date } = req.query;

  try {
    // Validate required query parameters
    if (!from || !to || !date) {
      return res.status(400).json({
        success: false,
        message: 'Missing required query parameters: from, to, date',
      });
    }

    // Find buses that match the criteria
    const buses = await Bus.findAll({
      include: [
        {
          model: Route,
          where: { origin: from, destination: to },
        },
      ],
    });

    if (buses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No buses found for the specified criteria',
      });
    }

    res.status(200).json({
      success: true,
      data: buses,
    });
  } catch (error) {
    console.error('Error searching buses:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching buses',
    });
  }
};

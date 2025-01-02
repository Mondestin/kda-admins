const Promotion = require('../../models/Promotion');

exports.getPromotions = async (req, res) => {
  const { route_id } = req.query;

  try {
    // Fetch promotions, optionally filtered by route
    const conditions = route_id ? { route_id } : {};

    const promotions = await Promotion.findAll({
      where: conditions,
    });

    if (promotions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No active promotions found',
      });
    }

    res.status(200).json({
      success: true,
      data: promotions,
    });
  } catch (error) {
    console.error('Error fetching promotions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching promotions',
    });
  }
};

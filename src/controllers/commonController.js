// Health Check
exports.healthCheck = (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Kukwenda API is running smoothly',
      uptime: process.uptime(),
      timestamp: new Date(),
    });
  };
  
  // API Information
  exports.getApiInfo = (req, res) => {
    res.status(200).json({
      success: true,
      data: {
        application: 'Kukwenda API',
        version: '1.0.0',
        description: 'API for managing bookings, payments, and refunds',
        author: 'Phoenone Group',
        license: 'MIT',
      },
    });
  };
  
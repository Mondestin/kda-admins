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
        application: 'Kukwenda ADMINS API',
        version: '1.0.0',
        description: 'API for managing bookings, payments, and refunds by buses companies and carriers',
        author: 'Phoenone Group',
        license: 'Phoenone Group',
      },
    });
  };
  
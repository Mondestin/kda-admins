// Success Response
exports.success = (res, message = 'Success', data = {}) => {
    res.status(200).json({
      success: true,
      message,
      data,
    });
  };
  
  // Error Response
  exports.error = (res, message = 'Error', statusCode = 500) => {
    res.status(statusCode).json({
      success: false,
      message,
    });
  };
  
  // Paginated Response
  exports.paginated = (res, message = 'Success', data = {}, pagination = {}) => {
    res.status(200).json({
      success: true,
      message,
      data,
      pagination,
    });
  };
  
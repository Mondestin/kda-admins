const { ValidationError } = require('joi');

// Middleware to validate request body, query, or params
const validate = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      const details = error.details.map((err) => ({
        field: err.context.key,
        message: err.message,
      }));
      return res.status(400).json({
        error: 'Validation error',
        details,
      });
    }

    next(); // Proceed to the next middleware or route handler
  };
};

module.exports = validate;

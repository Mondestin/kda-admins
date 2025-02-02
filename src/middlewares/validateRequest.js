const { error } = require('../utils/responseHelper');
const logger = require('../utils/logger');

const validateRequest = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error: validationError } = schema.validate(req[property], { abortEarly: false });
    
    if (validationError) {
      const errorMessage = validationError.details.map(detail => detail.message).join(', ');
      logger.warn(`Validation error: ${errorMessage}`);
      return error(res, errorMessage, 400);
    }
    
    next();
  };
};

module.exports = validateRequest; 
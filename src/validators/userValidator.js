const Joi = require('joi');

const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional()
    .messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 100 characters'
    }),
  email: Joi.string().email().optional()
    .messages({
      'string.email': 'Please provide a valid email address'
    })
});

module.exports = {
  updateProfileSchema
}; 
const Joi = require('joi');

// Schema for validating bus data
const busSchema = Joi.object({
  name: Joi.string().min(3).max(100).required()
    .messages({
      'string.min': 'Bus name must be at least 3 characters long',
      'string.max': 'Bus name cannot exceed 100 characters',
      'any.required': 'Bus name is required'
    }),
  capacity: Joi.number().integer().min(1).required()
    .messages({
      'number.base': 'Capacity must be a number',
      'number.min': 'Capacity must be at least 1',
      'any.required': 'Capacity is required'
    }),
  registration_number: Joi.string().required()
    .messages({
      'any.required': 'Registration number is required'
    }),
  bus_company_id: Joi.number().integer().required()
    .messages({
      'any.required': 'Bus company ID is required'
    }),
  amenity_ids: Joi.array().items(Joi.number().integer()).optional()
    .messages({
      'array.base': 'Amenities must be an array of IDs'
    }),
  description: Joi.string().max(500).optional()
    .messages({
      'string.max': 'Description cannot exceed 500 characters'
    })
});

// Schema for validating bus ID in params
const busIdSchema = Joi.object({
  busId: Joi.number().integer().required()
    .messages({
      'number.base': 'Bus ID must be a number',
      'any.required': 'Bus ID is required'
    })
});

// Schema for updating bus (making all fields optional)
const busUpdateSchema = busSchema.fork(
  Object.keys(busSchema.describe().keys), 
  (schema) => schema.optional()
);

module.exports = {
  busSchema,
  busIdSchema,
  busUpdateSchema
};

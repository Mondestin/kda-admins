const Joi = require('joi');

// Schema for validating bus data
const busSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  capacity: Joi.number().integer().min(1).required(),
  registration_number: Joi.string().required(),
  wifi: Joi.boolean().optional(),
  toilet: Joi.boolean().optional(),
  food: Joi.boolean().optional(),
  air_conditioning: Joi.boolean().optional(),
  charging_ports: Joi.boolean().optional(),
  description: Joi.string().max(500).optional(),
});

module.exports = {
  busSchema,
};

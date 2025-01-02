const Joi = require('joi');

// Schema for validating search queries
const searchSchema = Joi.object({
  from: Joi.string().min(2).max(100).required(),
  to: Joi.string().min(2).max(100).required(),
  date: Joi.date().iso().required(),
});

module.exports = {
  searchSchema,
};

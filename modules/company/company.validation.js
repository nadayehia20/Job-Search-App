import Joi from "joi";

export const addCompanyVal = Joi.object({
  companyName: Joi.string().max(100).required(),
  description: Joi.string().max(1000).required(),
  industry: Joi.string().max(200).required(),
  address: Joi.string().max(200).required(),
  numberOfEmployees: Joi.number().min(20).max(500).required(),
  companyEmail: Joi.string().email().max(100).required(),
  companyHR: Joi.string().hex().length(24).required(),
});

export const updateCompanyVal = Joi.object({
  companyName: Joi.string().max(100),
  description: Joi.string().max(1000),
  industry: Joi.string().max(200),
  address: Joi.string().max(200),
  numberOfEmployees: Joi.number().min(20).max(500),
  companyEmail: Joi.string().email().max(100),
  companyHR: Joi.string().hex().length(24),
  companyId: Joi.string().hex().length(24).required(),
});

export const companyIdVal = Joi.object({
  companyId: Joi.string().hex().length(24).required(),
});

export const companyNameVal = Joi.object({
  companyName: Joi.string().max(100).required(),
});

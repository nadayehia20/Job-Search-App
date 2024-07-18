import Joi from "joi";

export const updateUserVal = Joi.object({
  email: Joi.string().email().max(100),
  mobileNumber: Joi.string().min(5).max(20),
  recoveryEmail: Joi.string().email().max(100),
  DOB: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  lastName: Joi.string().min(2).max(100),
  firstName: Joi.string().min(2).max(100),
  userId: Joi.string().hex().length(24).required(),
});

export const getUserByRecoveryEmailVal = Joi.object({
  recoveryEmail: Joi.string().email().max(100).required(),
});

export const forgotPasswordVal = Joi.object({
  email: Joi.string().email().max(100).required(),
});

export const updateUserPasswordVal = Joi.object({
  password: Joi.string().required(),
  userId: Joi.string().hex().length(24).required(),
});

export const userIdVal = Joi.object({
  userId: Joi.string().hex().length(24).required(),
});

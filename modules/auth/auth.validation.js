import Joi from "joi";

export const signupVal = Joi.object({
  email: Joi.string().email().max(100).required(),
  mobileNumber: Joi.string().min(5).max(20).required(),
  recoveryEmail: Joi.string().email().max(100).required(),
  password: Joi.string().required(),
  DOB: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .required(),
  lastName: Joi.string().min(2).max(100).required(),
  firstName: Joi.string().min(2).max(100).required(),
  role: Joi.string().valid("User", "Company_HR").required(),
  status: Joi.string().valid("online", "offline"),
});

export const signinVal = Joi.object({
  email: Joi.string().email().max(100),
  mobileNumber: Joi.string().min(5).max(20),
  recoveryEmail: Joi.string().email().max(100),
  password: Joi.string().required(),
})
  .xor("email", "mobileNumber", "recoveryEmail")
  .required();

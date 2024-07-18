import Joi from "joi";

export const getAllAppsOfAJobVal = Joi.object({
  jobId: Joi.string().hex().length(24).required(),
});

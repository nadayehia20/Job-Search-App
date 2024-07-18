import Joi from "joi";

export const addJobVal = Joi.object({
  jobTitle: Joi.string().max(100).required(),
  jobLocation: Joi.string().valid("onsite", "remotely", "hybrid").required(),
  workingTime: Joi.string().valid("part-time", "full-time").required(),
  seniorityLevel: Joi.string()
    .valid("Junior", "Mid-Level", "Senior", "Team-Lead", "CTO")
    .required(),
  jobDescription: Joi.string().max(1000).required(),
  technicalSkills: Joi.array().items(Joi.string()).default([]).required(),
  softSkills: Joi.array().items(Joi.string()).default([]).required(),
  addedBy: Joi.string().hex().length(24).required(),
});

export const updateJobVal = Joi.object({
  jobTitle: Joi.string().max(100),
  jobLocation: Joi.string().valid("onsite", "remotely", "hybrid"),
  workingTime: Joi.string().valid("part-time", "full-time"),
  seniorityLevel: Joi.string().valid(
    "Junior",
    "Mid-Level",
    "Senior",
    "Team-Lead",
    "CTO"
  ),
  jobDescription: Joi.string().max(1000),
  technicalSkills: Joi.array().items(Joi.string()).default([]),
  softSkills: Joi.array().items(Joi.string()).default([]),
  jobId: Joi.string().hex().length(24).required(),
  addedBy: Joi.string().hex().length(24),
});

export const filterJobsVal = Joi.object({
  jobTitle: Joi.string().max(100),
  jobLocation: Joi.string().valid("onsite", "remotely", "hybrid"),
  workingTime: Joi.string().valid("part-time", "full-time"),
  seniorityLevel: Joi.string().valid(
    "Junior",
    "Mid-Level",
    "Senior",
    "Team-Lead",
    "CTO"
  ),
  technicalSkills: Joi.array().items(Joi.string()).default([]),
});

export const jobIdVal = Joi.object({
  jobId: Joi.string().hex().length(24).required(),
});

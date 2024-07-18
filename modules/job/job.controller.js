import company from "../../models/company.model.js";
import job from "../../models/job.model.js";
import { catchError } from "../errorHandling/catchError.js";
import { AppError } from "../errorHandling/appError.js";

export const getAllJobs = catchError(async (req, res) => {
  const result = await job.find().populate("addedBy", "-password");
  let updatedJobs = [];

  for (const jobItem of result) {
    const companies = await company.find({ companyHR: jobItem.addedBy.id });
    const updatedJob = { ...jobItem._doc, companies };
    updatedJobs.push(updatedJob);
  }

  res.json(updatedJobs);
});

export const addJob = catchError(async (req, res) => {
  const result = await job.create(req.body);
  res.json(result);
});

export const updateJob = catchError(async (req, res) => {
  const result = await job.findByIdAndUpdate(req.params.jobId, req.body, {
    new: true,
  });
  res.json(result);
});

export const deleteJob = catchError(async (req, res) => {
  const result = await job.findByIdAndDelete(req.params.jobId);
  res.json(result);
});

export const getJobsForACompany = catchError(async (req, res, next) => {
  const companyName = req.query.companyName;
  const existingCompany = await company.findOne({ companyName });
  if (!existingCompany)
    return next(new AppError("The specified company does not exist", 400));
  else {
    const result = await job
      .find({ addedBy: existingCompany.companyHR })
      .populate("addedBy", "-_id -password");

    res.json(result);
  }
});

export const filterJobs = catchError(async (req, res) => {
  const filters = req.body;
  const query = {};
  if (filters.workingTime) {
    query.workingTime = filters.workingTime;
  }
  if (filters.jobLocation) {
    query.jobLocation = filters.jobLocation;
  }
  if (filters.seniorityLevel) {
    query.seniorityLevel = filters.seniorityLevel;
  }
  if (filters.jobTitle) {
    query.jobTitle = filters.jobTitle;
  }
  if (filters.technicalSkills) {
    query.technicalSkills = { $in: filters.technicalSkills };
  }

  const result = await job.find(query);

  res.json(result);
});

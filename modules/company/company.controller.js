import company from "../../models/company.model.js";
import job from "../../models/job.model.js";
import { catchError } from "../errorHandling/catchError.js";
import { AppError } from "../errorHandling/appError.js";

export const getAllCompanies = catchError(async (req, res) => {
  const result = await company.find().populate("companyHR", "-_id -password");
  res.json(result);
});

export const addCompany = catchError(async (req, res) => {
  const result = await company.create(req.body);
  res.json(result);
});

export const updateCompany = catchError(async (req, res, next) => {
  const existingCompany = await company
    .findById(req.params.companyId)
    .populate("companyHR", "-password");
  if (existingCompany.companyHR.id !== req.user.id)
    return next(
      new AppError(
        "You can not update this company as you're not the owner.",
        400
      )
    );
  else {
    const result = await company.findByIdAndUpdate(
      req.params.companyId,
      req.body,
      { new: true }
    );
    res.json(result);
  }
});

export const deleteCompany = catchError(async (req, res, next) => {
  const existingCompany = await company
    .findById(req.params.companyId)
    .populate("companyHR", "-password");
  if (existingCompany.companyHR.id !== req.user.id)
    return next(
      new AppError(
        "You can not update this company as you're not the owner.",
        400
      )
    );
  else {
    const result = await company.findByIdAndDelete(req.params.companyId);
    res.json(result);
  }
});

export const getCompanyData = catchError(async (req, res) => {
  const result = await company
    .findById(req.params.companyId)
    .populate("companyHR", "-password");
  let jobs = [];
  let updatedObj = result;
  if (result.companyHR) {
    jobs = await job.find({ addedBy: result.companyHR._id });
    updatedObj = { ...result._doc, jobs };
  }
  res.json(updatedObj);
});

export const getCompanyDataByName = catchError(async (req, res) => {
  const companyName = req.params.companyName;
  const result = await company
    .find({ companyName })
    .populate("companyHR", "-password");
  res.json(result);
});

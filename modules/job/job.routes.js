import { Router } from "express";
import { checkJobId } from "./job.middlewares.js";
import { authentication, authorization } from "../auth/auth.middlewares.js";
import {
  addJob,
  deleteJob,
  filterJobs,
  getAllJobs,
  getJobsForACompany,
  updateJob,
} from "./job.controller.js";
import { validate } from "../validation/validation.js";
import {
  addJobVal,
  updateJobVal,
  filterJobsVal,
  jobIdVal,
} from "./job.validation.js";
import { companyNameVal } from "../company/company.validation.js";

const jobRouter = Router();

jobRouter
  .route("/")
  .get(authentication(), authorization(["Company_HR", "User"]), getAllJobs)
  .post(
    authentication(),
    authorization(["Company_HR"]),
    validate(addJobVal),
    addJob
  );
jobRouter
  .route("/company")
  .get(
    authentication(),
    authorization(["Company_HR", "User"]),
    validate(companyNameVal),
    getJobsForACompany
  );
jobRouter
  .route("/filter")
  .post(
    authentication(),
    authorization(["Company_HR", "User"]),
    validate(filterJobsVal),
    filterJobs
  );
jobRouter
  .route("/:jobId")
  .put(authentication(), validate(updateJobVal), checkJobId, updateJob)
  .delete(authentication(), validate(jobIdVal), checkJobId, deleteJob);
export default jobRouter;

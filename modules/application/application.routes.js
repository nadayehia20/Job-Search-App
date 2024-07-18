import { Router } from "express";
import { authentication, authorization } from "../auth/auth.middlewares.js";
import {
  applyToAJob,
  getAllAppsOfAJob,
  makeExcelSheetWithApplications,
} from "./application.controller.js";
import { checkJobId } from "../job/job.middlewares.js";
import { validate } from "../validation/validation.js";
import { getAllAppsOfAJobVal } from "./application.validation.js";

const applicationRouter = Router();

applicationRouter
  .route("/:jobId")
  .get(
    authentication(),
    authorization(["Company_HR"]),
    validate(getAllAppsOfAJobVal),
    checkJobId,
    getAllAppsOfAJob
  );
applicationRouter
  .route("/")
  .get(authentication(), makeExcelSheetWithApplications)
  .post(authentication(), authorization(["User"]), applyToAJob);

export default applicationRouter;

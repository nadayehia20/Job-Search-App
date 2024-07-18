import job from "../../models/job.model.js";
import { AppError } from "../errorHandling/appError.js";
import { catchError } from "../errorHandling/catchError.js";

//middleware to check jobId
export const checkJobId = catchError(async (req, res, next) => {
  const jobId = req.params.jobId;
  // Check if the job with the specified ID exists
  const existingJob = await job.findById(jobId);

  if (!existingJob) {
    return next(new AppError("This job ID does not exist.", 404));
  }
  next();
});

import user from "../../models/user.model.js";
import { AppError } from "../errorHandling/appError.js";
import { catchError } from "../errorHandling/catchError.js";

//middleware to check userId
export const checkUserId = catchError(async (req, res, next) => {
  const userId = req.params.userId;
  // Check if the user with the specified ID exists
  const existingUser = await user.findById(userId);

  if (!existingUser) {
    return next(new AppError("This user ID does not exist.", 404));
  }
  next();
});

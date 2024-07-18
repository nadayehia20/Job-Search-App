import company from "../../models/company.model.js";
import { catchError } from "../errorHandling/catchError.js";

//middleware to check companyId
export const checkCompanyId = catchError(async (req, res, next) => {
  const companyId = req.params.companyId;
  // Check if the company with the specified ID exists
  const existingCompany = await company.findById(companyId);

  if (!existingCompany) {
    return next(new AppError("This company ID does not exist.", 404));
  }
  next();
});

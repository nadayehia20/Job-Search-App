import { Router } from "express";
import {
  addCompany,
  deleteCompany,
  getAllCompanies,
  getCompanyData,
  getCompanyDataByName,
  updateCompany,
} from "./company.controller.js";
import { checkCompanyId } from "./company.middlewares.js";
import { authentication, authorization } from "../auth/auth.middlewares.js";
import { validate } from "../validation/validation.js";
import {
  addCompanyVal,
  companyIdVal,
  companyNameVal,
  updateCompanyVal,
} from "./company.validation.js";

const companyRouter = Router();

companyRouter
  .route("/")
  .get(getAllCompanies)
  .post(
    authentication(),
    authorization(["Company_HR"]),
    validate(addCompanyVal),
    addCompany
  );
companyRouter
  .route("/search/:companyName")
  .get(
    authentication(),
    authorization(["Company_HR", "User"]),
    validate(companyNameVal),
    getCompanyDataByName
  );
companyRouter
  .route("/:companyId")
  .get(
    authentication(),
    authorization(["Company_HR"]),
    validate(companyIdVal),
    checkCompanyId,
    getCompanyData
  )
  .put(
    authentication(),
    authorization(["Company_HR"]),
    checkCompanyId,
    validate(updateCompanyVal),
    updateCompany
  )
  .delete(
    authentication(),
    authorization(["Company_HR"]),
    validate(companyIdVal),
    checkCompanyId,
    deleteCompany
  );

export default companyRouter;

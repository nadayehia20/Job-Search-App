import { Router } from "express";
import { requestPasswordReset, resetPassword } from "./otp.controllers.js";
import { verifyUserToResetPassword } from "./otp.middlewares.js";
import { authentication } from "../auth/auth.middlewares.js";

const otpRouter = Router();
otpRouter
  .route("/request-password-reset/:userId")
  .post(authentication(), verifyUserToResetPassword, requestPasswordReset);
otpRouter.route("/reset-password").post(authentication(), resetPassword);
export default otpRouter;

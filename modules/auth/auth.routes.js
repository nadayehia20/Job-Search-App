import { Router } from "express";
import { signup, signin } from "./auth.controller.js";
import { validate } from "../validation/validation.js";
import { signupVal, signinVal } from "./auth.validation.js";

const authRouter = Router();

authRouter.post("/signup", validate(signupVal), signup);
authRouter.post("/signin", validate(signinVal), signin);

export default authRouter;

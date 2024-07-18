import { Router } from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUserAccountData,
  getUserById,
  getUsersByRecoveryEmail,
  updateUser,
  updateUserPassword,
} from "./user.controller.js";
import { checkUserId } from "./user.middlewares.js";
import { authentication } from "../auth/auth.middlewares.js";
import { validate } from "../validation/validation.js";
import {
  updateUserVal,
  getUserByRecoveryEmailVal,
  updateUserPasswordVal,
  userIdVal,
  forgotPasswordVal,
} from "./user.validation.js";

const userRouter = Router();

userRouter.route("/").get(getAllUsers);
userRouter
  .route("/forgotPassword")
  .post(validate(forgotPasswordVal), forgotPassword);
userRouter
  .route("/details/:userId")
  .get(authentication(), validate(userIdVal), checkUserId, getUserAccountData);
userRouter
  .route("/getByRecoveryEmail")
  .get(
    authentication(),
    validate(getUserByRecoveryEmailVal),
    getUsersByRecoveryEmail
  );
userRouter
  .route("/updatePassword/:userId")
  .put(
    authentication(),
    checkUserId,
    validate(updateUserPasswordVal),
    updateUserPassword
  );
userRouter
  .route("/:userId")
  .get(validate(userIdVal), checkUserId, getUserById)
  .put(authentication(), checkUserId, validate(updateUserVal), updateUser)
  .delete(authentication(), validate(userIdVal), checkUserId, deleteUser);

export default userRouter;

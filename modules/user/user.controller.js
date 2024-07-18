import user from "../../models/user.model.js";
import { catchError } from "../errorHandling/catchError.js";
import { AppError } from "../errorHandling/appError.js";

export const getAllUsers = catchError(async (req, res) => {
  const result = await user.find();
  res.json(result);
});

export const getUserAccountData = catchError(async (req, res, next) => {
  if (req.params.userId !== req.user.id)
    return next(new AppError("You can only view your account details.", 400));
  const result = await user.findById(req.params.userId);
  res.json(result);
});

export const getUserById = catchError(async (req, res) => {
  const result = await user.findById(req.params.userId);
  res.json(result);
});

export const updateUser = catchError(async (req, res, next) => {
  if (req.params.userId !== req.user.id)
    return next(
      new AppError("You can not update this user as you're not the owner.", 400)
    );
  else {
    const existingUser = user.findById(req.params.userId);
    const { email, mobileNumber, recoveryEmail, DOB, lastName, firstName } =
      req.body;

    // Check for conflicts if updating email
    if (email) {
      const existingEmailUser = await user.findOne({ email });
      if (existingEmailUser && existingEmailUser.id !== existingUser.id) {
        return next(new AppError("Email already exists", 400));
      }
    }

    // Check for conflicts if updating mobileNumber
    if (mobileNumber) {
      const existingMobileUser = await user.findOne({ mobileNumber });
      if (existingMobileUser && existingMobileUser.id !== existingUser.id) {
        return next(new AppError("Mobile number already exists", 400));
      }
    }

    // Create an update object with the fields to be updated
    const username = firstName + lastName;
    const updateObj = {
      email: email || existingUser.email,
      mobileNumber: mobileNumber || existingUser.mobileNumber,
      recoveryEmail: recoveryEmail || existingUser.recoveryEmail,
      DOB: DOB || existingUser.DOB,
      lastName: lastName || existingUser.lastName,
      firstName: firstName || existingUser.firstName,
      username: username || existingUser.username,
    };

    // Update the user document by ID
    const result = await user.findByIdAndUpdate(req.params.userId, updateObj, {
      new: true,
    });
    res.json(result);
  }
});

export const deleteUser = catchError(async (req, res, next) => {
  if (req.params.userId !== req.user.id)
    return next(
      new AppError("You can not delete this user as you're not the owner.", 400)
    );
  else {
    const result = await user.findByIdAndDelete(req.params.userId);
    res.json(result);
  }
});

export const getUsersByRecoveryEmail = catchError(async (req, res) => {
  const recoveryEmail = req.body.recoveryEmail;
  const result = await user.find({ recoveryEmail });
  res.json(result);
});

export const updateUserPassword = catchError(async (req, res) => {
  const { password } = req.body;
  const hashedPassword = brcypt.hashSync(password, 5);
  await user.findByIdAndUpdate(
    req.params.userId,
    { password: hashedPassword },
    { new: true }
  );
  // Create an update object with the fields to be updated
  const updateObj = {
    email: email || existingUser.email,
    mobileNumber: mobileNumber || existingUser.mobileNumber,
    recoveryEmail: recoveryEmail || existingUser.recoveryEmail,
    DOB: DOB || existingUser.DOB,
    lastName: lastName || existingUser.lastName,
    firstName: firstName || existingUser.firstName,
    username:
      (firstName || existingUser.firstName) +
      (lastName || existingUser.lastName),
  };

  // Update the user document by ID
  const result = await user.findByIdAndUpdate(existingUser._id, updateObj, {
    new: true,
  });
  res.json(result);
  //}
});

export const forgotPassword = catchError(async (req, res, next) => {
  const { email, newPassword } = req.body;
  // Find the user by email
  const existingUser = await user.findOne({ email });

  // If the user does not exist, return an error
  if (!existingUser) {
    return next(new AppError("User not found", 404));
  }
  const hashedPassword = brcypt.hashSync(password, 5);
  await user.findByIdAndUpdate(existingUser.id, { password: hashedPassword });

  return res.status(200).json({ message: "Password changed successfully" });
});

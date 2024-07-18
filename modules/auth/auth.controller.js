import brcypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../../models/user.model.js";
import { catchError } from "../errorHandling/catchError.js";
import { AppError } from "../errorHandling/appError.js";

export const signup = catchError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    recoveryEmail,
    DOB,
    mobileNumber,
    role,
    status,
  } = req.body;
  const existingUser = await user.findOne({
    $or: [{ email }, { mobileNumber }],
  });
  if (existingUser)
    return next(new AppError("Email or mobile number already exists", 400));
  else {
    const hashedPassword = brcypt.hashSync(password, 5);
    const username = firstName + "" + lastName;
    await user.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      recoveryEmail,
      DOB,
      mobileNumber,
      role,
      status,
    });
    res.status(201).json({ message: "signed up successfully" });
  }
});

export const signin = catchError(async (req, res, next) => {
  const { email, recoveryEmail, mobileNumber, password } = req.body;
  let existingUser;
  if (email) {
    existingUser = await user.findOne({ email });
  } else if (recoveryEmail) {
    existingUser = await user.findOne({ recoveryEmail });
  } else if (mobileNumber) {
    existingUser = await user.findOne({ mobileNumber });
  }
  if (!existingUser) return next(new AppError("Invalid Credentials", 400));
  const isMatch = brcypt.compareSync(password, existingUser.password);
  if (!isMatch) return next(new AppError("Invalid Credentials", 400));
  await user.findByIdAndUpdate(existingUser._id, { status: "online" });
  const token = jwt.sign(
    {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      role: existingUser.role,
    },
    process.env.JWT_SECRET
  );
  res.json({ message: "signed in successfully", token });
});

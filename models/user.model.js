import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    username: {
      type: String,
      maxLength: 200,
    },
    email: {
      type: String,
      required: true,
      maxLength: 100,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    recoveryEmail: {
      type: String,
      required: true,
      maxLength: 100,
    },
    DOB: {
      type: Date,
      required: true,
      match: [
        /^\d{4}-\d{1,2}-\d{1,2}$/,
        'Please provide a valid date in the format "YYYY-MM-DD".',
      ],
    },
    mobileNumber: {
      type: String,
      minLength: 5,
      maxLength: 20,
      unique: true,
    },
    role: {
      type: String,
      enum: ["User", "Company_HR"],
      default: "User",
    },
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    otp: {
      type: String,
    },
    otpExpiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const user = mongoose.model("User", userSchema);

export default user;

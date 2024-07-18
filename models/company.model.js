import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      maxLength: 100,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 1000,
    },
    industry: {
      type: String,
      maxLength: 200,
      required: true,
    },
    address: {
      type: String,
      required: true,
      maxLength: 200,
    },
    numberOfEmployees: {
      type: Number,
      required: true,
      min: 20,
      max: 500,
    },
    companyEmail: {
      type: String,
      required: true,
      maxLength: 100,
      unique: true,
    },
    companyHR: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const company = mongoose.model("Company", companySchema);

export default company;

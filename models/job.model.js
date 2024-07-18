import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
      maxLength: 100,
    },
    jobLocation: {
      type: String,
      required: true,
      enum: ["onsite", "remotely", "hybrid"],
    },
    workingTime: {
      type: String,
      required: true,
      enum: ["part-time", "full-time"],
    },
    seniorityLevel: {
      type: String,
      required: true,
      enum: ["Junior", "Mid-Level", "Senior", "Team-Lead", "CTO"],
    },
    jobDescription: {
      type: String,
      required: true,
      maxLength: 1000,
    },
    technicalSkills: {
      type: [String],
      default: [],
      required: true,
    },
    softSkills: {
      type: [String],
      default: [],
      required: true,
    },
    addedBy: {
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

const job = mongoose.model("Job", jobSchema);

export default job;

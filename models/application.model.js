import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Job",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    userTechSkills: {
      type: [String],
      default: [],
      required: true,
    },
    userSoftSkills: {
      type: [String],
      default: [],
      required: true,
    },
    userResume: {
      name: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const application = mongoose.model("Application", applicationSchema);

export default application;

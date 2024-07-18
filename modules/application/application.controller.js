import application from "../../models/application.model.js";
import job from "../../models/job.model.js";
import { AppError } from "../errorHandling/appError.js";
import { catchError } from "../errorHandling/catchError.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import ExcelJS from "exceljs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

export const getAllAppsOfAJob = catchError(async (req, res, next) => {
  const jobId = req.params.jobId;
  const existingJob = await job.findById(jobId);
  if (existingJob.addedBy !== req.user.id)
    return next(
      new AppError(
        "You can not view the applications of this job as you're not the owner of the company.",
        400
      )
    );
  else {
    const result = await application
      .find({ jobId })
      .populate("userId", "-password");
    res.json(result);
  }
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

// Multer file filter for accepting only PDF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new AppError("Only PDF files are allowed.", 400), false);
  }
};

const limits = {
  fileSize: 10 * 1024 * 1024, // 10 MB
};

// Multer upload instance
const upload = multer({ storage, fileFilter, limits });

export const applyToAJob = catchError(async (req, res, next) => {
  // Multer middleware to handle file upload
  upload.single("userResume")(req, res, async (err) => {
    if (err) {
      return next(new AppError(err.message, 400));
    }

    // Access form fields and uploaded file details
    const { jobId, userId, userTechSkills, userSoftSkills } = req.body;
    const resume = req.file;

    // Create a new application
    const newApplication = new application({
      jobId,
      userId,
      userTechSkills,
      userSoftSkills,
      userResume: {
        name: resume.originalname,
        path: resume.path,
      },
    });

    // Save the application to the database
    await newApplication.save();

    return res
      .status(200)
      .json({ message: "Application submitted successfully" });
  });
});

export const makeExcelSheetWithApplications = catchError(
  async (req, res, next) => {
    const applications = await application.find({});
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Applications");

    // Add headers to the Excel sheet
    worksheet.addRow(["userId", "jobId", "userTechSkills", "userSoftSkills"]);

    // Add data rows to the Excel sheet
    applications.forEach((application) => {
      worksheet.addRow([
        application.userId,
        application.jobId,
        application.userTechSkills,
        application.userSoftSkills,
      ]);
    });

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // Generate a unique filename based on the current timestamp
    const fileName = `applications-${Date.now()}.xlsx`;
    const filePath = path.join(__dirname, "applicationsExcel", fileName);

    // Write the Excel file with the generated filename
    await workbook.xlsx.writeFile(filePath);

    // Set headers for download response
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);

    // Send the Excel file as a download response
    res.sendFile(filePath);
  }
);

process.on("uncaughtException", (err) => {
  console.log("error in code");
});
import express from "express";
import "./database/dbConnection.js";
import companyRouter from "./modules/company/company.routes.js";
import userRouter from "./modules/user/user.routes.js";
import applicationRouter from "./modules/application/application.routes.js";
import jobRouter from "./modules/job/job.routes.js";
import authRouter from "./modules/auth/auth.routes.js";
import otpRouter from "./modules/otp/otp.routes.js";
import { AppError } from "./modules/errorHandling/appError.js";
import dotenv from "dotenv";

const app = express();
const port = 3000;

// Load environment variables from .env file
dotenv.config();

app.use(express.json());

app.use("/users", userRouter);
app.use("/companies", companyRouter);
app.use("/applications", applicationRouter);
app.use("/jobs", jobRouter);
app.use("/auth", authRouter);
app.use("/password", otpRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`route not found ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  let code = err.statusCode || 500;
  res.status(code).json({ error: "error", message: err.message });
});

process.on("unhandledRejection", (err) => {
  console.log("error", err);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

import jwt from "jsonwebtoken";
import { AppError } from "../errorHandling/appError.js";

export const authentication = () => (req, res, next) => {
  const { token } = req.headers;

  if (!token) return next(new AppError("please sign in", 401));
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(new AppError("Invalid token", 498));

    req.user = decoded;
    next();
  });
};

export const authorization = (roles) => (req, res, next) => {
  const { token } = req.headers;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (!roles.includes(decoded.role)) {
      return next(
        new AppError("Your role is not authorized to perform this action", 403)
      );
    }
    next();
  });
};

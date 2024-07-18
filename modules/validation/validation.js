import { AppError } from "../errorHandling/appError.js";

export const validate = (schema) => {
  return (req, res, next) => {
    let { error } = schema.validate(
      { ...req.body, ...req.params, ...req.query, ...req.file },
      { abortEarly: false }
    );
    if (!error) {
      next();
    } else {
      let errMsgs = error.details.map((err) => {
        return err.message;
      });
      next(new AppError(errMsgs, 400));
    }
  };
};

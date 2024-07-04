/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import AppError from "../error/AppError";

// eslint-disable-next-line no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "something went wrong";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;

    return res.status(statusCode).json({
      success: false,
      message,
    });
  } else if (err instanceof ZodError) {
    message = "Zod validation error";
    statusCode = 400;
  } else if (err?.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID!";
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  return res.status(statusCode).json({
    success: false,
    message,
    err,
  });
};

export default globalErrorHandler;

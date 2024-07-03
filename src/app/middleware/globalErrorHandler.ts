/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";

// eslint-disable-next-line no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  return res.status(500).json({
    success: false,
    message: "something went wrong",
    err,
  });
};

export default globalErrorHandler;

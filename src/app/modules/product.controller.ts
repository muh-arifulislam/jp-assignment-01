import { ProductServices } from "./product.service";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";

const createSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.addOneIntoDB(req.body);
  sendResponse(res, {
    success: true,
    message: "Product created successfully!",
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await ProductServices.getAllFromDB(query);
  sendResponse(res, {
    success: true,
    message: "Products fetched successfully!",
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const ProductControllers = { createSingleProduct, getAllProducts };

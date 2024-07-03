import { ProductServices } from "./product.service";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

const createSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.addOneIntoDB(req.body);
  sendResponse(res, {
    success: true,
    message: "created suc",
    statusCode: 201,
    data: result,
  });
});

export const ProductControllers = { createSingleProduct };

import { ProductServices } from "./product.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
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

  const { message, data } = await ProductServices.getAllFromDB(query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message,
    data,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await ProductServices.getOneFromDB(productId);
  sendResponse(res, {
    success: true,
    message: "Product fetched successfully!",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await ProductServices.updateOneIntoDB(productId, req.body);
  sendResponse(res, {
    success: true,
    message: "Product updated successfully!",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  await ProductServices.deleteOneFromDB(productId);
  sendResponse(res, {
    success: true,
    message: "Product deleted successfully!",
    statusCode: httpStatus.OK,
    data: null,
  });
});

export const ProductControllers = {
  createSingleProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};

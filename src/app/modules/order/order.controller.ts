import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OrderServices } from "./order.service";

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.addOneIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Order created successfully!",
    data: result,
  });
});

const getOrders = catchAsync(async (req, res) => {
  const { email } = req.query;

  const result = await OrderServices.findOrdersFromDB(email as string);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Orders fetched successfully!",
    data: result,
  });
});

export const OrderControllers = { createOrder, getOrders };

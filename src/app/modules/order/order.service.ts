import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { Product } from "../product/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";
import mongoose from "mongoose";

const addOneIntoDB = async (payload: TOrder) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //check is product exists
    const product = await Product.findById(payload.productId);
    if (!product) {
      throw new AppError(httpStatus.NOT_FOUND, "Product not found!");
    }

    //check sufficient stock is available
    if (
      product.inventory.quantity === 0 ||
      product.inventory.quantity < payload.quantity
    ) {
      throw new AppError(
        httpStatus.FAILED_DEPENDENCY,
        "Insufficient quantity available in inventory"
      );
    }

    //create order
    const result = await Order.create([payload], {
      new: true,
      session,
    });

    //update product stock
    const newInventoryQuantity = product.inventory.quantity - payload.quantity;
    if (newInventoryQuantity === 0) {
      product.inventory = {
        quantity: 0,
        inStock: false,
      };
      await product.save({ session });
    } else {
      product.inventory.quantity = newInventoryQuantity;
      await product.save({ session });
    }

    await session.commitTransaction();
    await session.endSession();

    return result;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, err.message);
  }
};

const findOrdersFromDB = async (email: string | null | undefined) => {
  const aggregate = Order.aggregate([]);

  //filter order if email is provided
  if (email) {
    aggregate.match({ email });
  }

  //project stage
  aggregate.project({
    _id: 0,
  });

  const orders = await aggregate;

  let message = "Orders fetched successfully!";

  if (email) {
    message = "Orders fetched successfully for user email!";
  }

  return {
    message,
    data: orders,
  };
};

export const OrderServices = {
  addOneIntoDB,
  findOrdersFromDB,
};

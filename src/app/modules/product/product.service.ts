/* eslint-disable @typescript-eslint/no-unused-vars */

import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const addOneIntoDB = async (payload: IProduct) => {
  const result = await Product.create(payload);

  // eslint-disable-next-line no-unused-vars
  const { _id, createdAt, updatedAt, ...restData } = result.toObject();
  return restData;
};

const getAllFromDB = async (params: Record<string, unknown>) => {
  const query = Product.aggregate([]);

  //match by search term stage
  if (params.searchTerm) {
    const searchTerm = params.searchTerm;
    const searchableFields = ["name"];
    const searchQuery = {
      $or: searchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: "i" },
      })),
    };
    query.match(searchQuery);
  }

  //project stage
  query.project({
    _id: 0,
    createdAt: 0,
    updatedAt: 0,
  });

  const result = await query;

  let message = "Products fetched successfully!";

  //set message for filtered products
  if (params?.searchTerm) {
    message = `Products matching search term '${params?.searchTerm}' fetched successfully!`;
  }

  return {
    message,
    data: result,
  };
};

const getOneFromDB = async (id: string) => {
  const result = await Product.findById(id).select({
    _id: 0,
    createdAt: 0,
    updatedAt: 0,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  return result;
};

const updateOneIntoDB = async (id: string, payload: Partial<IProduct>) => {
  //check if product exists
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  //destructure payload according to data type
  const { inventory, tags, variants, ...remainingProductData } = payload;

  const modifiedUpdatedDoc: Record<string, unknown> = {
    ...remainingProductData,
  };

  //modify inventory obj
  if (inventory && Object.keys(inventory).length) {
    for (const [key, value] of Object.entries(inventory)) {
      modifiedUpdatedDoc[`inventory.${key}`] = value;
    }
  }

  //modify tags arr
  if (tags) {
    modifiedUpdatedDoc.tags = tags;
  }

  //modify variants arr
  if (variants) {
    modifiedUpdatedDoc.variants = variants;
  }

  const result = await Product.findByIdAndUpdate(id, modifiedUpdatedDoc, {
    new: true,
    runValidators: true,
  }).select({
    _id: 0,
    createdAt: 0,
    updatedAt: 0,
  });

  return result;
};

const deleteOneFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found!");
  }

  return null;
};

export const ProductServices = {
  addOneIntoDB,
  getAllFromDB,
  getOneFromDB,
  updateOneIntoDB,
  deleteOneFromDB,
};

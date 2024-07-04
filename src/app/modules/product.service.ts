/* eslint-disable @typescript-eslint/no-unused-vars */

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

  //search term query
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
  return result;
};

export const ProductServices = { addOneIntoDB, getAllFromDB };

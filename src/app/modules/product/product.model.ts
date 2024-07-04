import { model, Schema, Types } from "mongoose";
import {
  IProduct,
  IProductMethods,
  ProductModel,
  TInventory,
  TVariant,
} from "./product.interface";

const variantSchema = new Schema<TVariant>(
  {
    type: { type: String, required: true },
    value: { type: String, required: true },
  },
  {
    _id: false,
    versionKey: false,
  }
);

const inventorySchema = new Schema<TInventory>(
  {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  {
    _id: false,
    versionKey: false,
  }
);

const productSchema = new Schema<IProduct, ProductModel, IProductMethods>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    variants: [variantSchema],
    inventory: inventorySchema,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

productSchema.statics.isProductExists = async function (
  id: string | Types.ObjectId
) {
  return await this.findById(id);
};

export const Product = model<IProduct, ProductModel>("Product", productSchema);

import { model, Schema } from "mongoose";
import { IProduct, TInventory, TVariant } from "./product.interface";

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

const productSchema = new Schema<IProduct>(
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

export const Product = model<IProduct>("Product", productSchema);

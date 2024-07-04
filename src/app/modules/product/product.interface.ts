import { Model, Types } from "mongoose";

export type TVariant = {
  type: string;
  value: string;
};

export type TInventory = {
  quantity: number;
  inStock: boolean;
};

export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariant[];
  inventory: TInventory;
  createdAt?: string;
  updatedAt?: string;
}

//method will add here
export interface IProductMethods {}

export interface ProductModel
  extends Model<IProduct, Record<string, never>, IProductMethods> {
  //static will add here
  // eslint-disable-next-line no-unused-vars
  isProductExists(id: string | Types.ObjectId): Promise<null | IProduct>;
}

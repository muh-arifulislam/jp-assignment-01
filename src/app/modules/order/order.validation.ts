import { z } from "zod";

const createOrderSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email address" }),
    productId: z.string({ message: "Invalid productId" }),
    price: z.number().positive({ message: "Price must be a positive number" }),
    quantity: z
      .number()
      .int()
      .positive({ message: "Quantity must be a positive integer" }),
  }),
});

export const OrderValidations = { createOrderSchema };

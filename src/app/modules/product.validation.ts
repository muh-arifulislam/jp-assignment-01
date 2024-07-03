import { z } from "zod";

const createVariantSchema = z.object({
  type: z.string({
    required_error: "Variant type is required!",
    invalid_type_error: "Variant type must be a string!",
  }),
  value: z.string({
    required_error: "Variant value is required!",
    invalid_type_error: "Variant value must be a string!",
  }),
});

const createInventorySchema = z.object({
  quantity: z.number({
    required_error: "Quantity is required!",
    invalid_type_error: "Quantity must be a number!",
  }),
  inStock: z.boolean({
    required_error: "InStoack is required!",
    invalid_type_error: "InStoack must be a boolean!",
  }),
});

const createProductSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Product Name is required!",
      invalid_type_error: "Product Name must be a string!",
    }),
    description: z.string({
      required_error: "Description is required!",
      invalid_type_error: "Description must be a string!",
    }),
    price: z.number({
      required_error: "Price is required!",
      invalid_type_error: "Price must be number!",
    }),
    category: z.string({
      required_error: "Category is required!",
      invalid_type_error: "Category must be a string!",
    }),
    tags: z.array(
      z.string({
        required_error: "Tag is required!",
        invalid_type_error: "Tag must be a string!",
      })
    ),
    variants: z.array(createVariantSchema),
    inventory: createInventorySchema,
  }),
});

export const ProductValidations = { createProductSchema };

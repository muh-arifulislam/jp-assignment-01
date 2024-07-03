import { Router } from "express";
import { ProductControllers } from "./product.controller";
import validateRequest from "../middleware/validateRequest";
import { ProductValidations } from "./product.validation";

const router = Router();

router.post(
  "/",
  validateRequest(ProductValidations.createProductSchema),
  ProductControllers.createSingleProduct
);

export const ProductRoutes = router;

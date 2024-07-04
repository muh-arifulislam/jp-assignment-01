import { Router } from "express";
import { OrderControllers } from "./order.controller";
import validateRequest from "../../middleware/validateRequest";
import { OrderValidations } from "./order.validation";

const router = Router();

router.post(
  "/",
  validateRequest(OrderValidations.createOrderSchema),
  OrderControllers.createOrder
);

export const OrderRoutes = router;

import { Router } from "express";
import { OrderController } from "./order.controller";
import { auth } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", auth(), OrderController.createOrder);
router.get("/", auth("ADMIN"), OrderController.getAllOrders);
router.get("/:id", auth(), OrderController.getOrderById);
router.patch("/:id/status", auth("ADMIN"), OrderController.updateOrderStatus);
router.delete("/:id", auth("ADMIN"), OrderController.deleteOrder);

export const OrderRoutes = router;

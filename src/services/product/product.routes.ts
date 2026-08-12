import { Router } from "express";
import { ProductController } from "./product.controller";
import { auth } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);

router.post("/", auth("ADMIN"), ProductController.createProduct);
router.patch("/:id", auth("ADMIN"), ProductController.updateProduct);
router.delete("/:id", auth("ADMIN"), ProductController.deleteProduct);

export const ProductRoutes = router;

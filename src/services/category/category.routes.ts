import { Router } from "express";
import { CategoryController } from "./category.controller";
import { auth } from "../../middlewares/auth.middleware";

const router = Router();

// Public — anyone can browse categories
router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);

// Admin-only — creating/editing/deleting categories
router.post("/", auth("ADMIN"), CategoryController.createCategory);
router.patch("/:id", auth("ADMIN"), CategoryController.updateCategory);
router.delete("/:id", auth("ADMIN"), CategoryController.deleteCategory);

export const CategoryRoutes = router;

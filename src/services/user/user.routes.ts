import { Router } from "express";
import { UserController } from "./user.controller";
import { auth } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/me", auth(), UserController.getMe);

export const UserRoutes = router;

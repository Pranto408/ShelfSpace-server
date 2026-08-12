import { Router } from "express";
import { ReviewController } from "./review.controller";
import { auth } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", ReviewController.getAllReviews);
router.get("/:id", ReviewController.getReviewById);

router.post("/", auth(), ReviewController.createReview);
router.patch("/:id", auth(), ReviewController.updateReview);
router.delete("/:id", auth(), ReviewController.deleteReview);

export const ReviewRoutes = router;

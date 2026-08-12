import { Request, Response, NextFunction } from "express";
import { ReviewService } from "./review.service";
import { sendResponse } from "../../lib/sendResponse";

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await ReviewService.createReview({
      ...req.body,
      userId: req.user!.id,
    });
    sendResponse(res, 201, {
      success: true,
      message: "Review created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllReviews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await ReviewService.getAllReviews();
    sendResponse(res, 200, {
      success: true,
      message: "Reviews fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getReviewById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await ReviewService.getReviewById((req.params.id as string));
    sendResponse(res, 200, {
      success: true,
      message: "Review fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await ReviewService.updateReview(
      (req.params.id as string),
      req.user!.id,
      req.body,
    );
    sendResponse(res, 200, {
      success: true,
      message: "Review updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await ReviewService.deleteReview(
      (req.params.id as string),
      req.user!.id,
      req.user!.role,
    );
    sendResponse(res, 200, {
      success: true,
      message: "Review deleted successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

export const ReviewController = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};


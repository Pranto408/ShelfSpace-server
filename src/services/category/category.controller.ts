import { Request, Response, NextFunction } from "express";
import { CategoryService } from "./category.service";
import { sendResponse } from "../../lib/sendResponse";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await CategoryService.createCategory(req.body);
    sendResponse(res, 201, {
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await CategoryService.getAllCategories();
    sendResponse(res, 200, {
      success: true,
      message: "Categories fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await CategoryService.getCategoryById((req.params.id as string));
    sendResponse(res, 200, {
      success: true,
      message: "Category fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await CategoryService.updateCategory(
      (req.params.id as string),
      req.body,
    );
    sendResponse(res, 200, {
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await CategoryService.deleteCategory((req.params.id as string));
    sendResponse(res, 200, {
      success: true,
      message: "Category deleted successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

export const CategoryController = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};

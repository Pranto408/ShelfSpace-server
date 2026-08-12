import { Request, Response, NextFunction } from "express";
import { ProductService } from "./product.service";
import { sendResponse } from "../../lib/sendResponse";

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await ProductService.createProduct(req.body);
    sendResponse(res, 201, {
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await ProductService.getAllProducts();
    sendResponse(res, 200, {
      success: true,
      message: "Products fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await ProductService.getProductById(req.params.id);
    sendResponse(res, 200, {
      success: true,
      message: "Product fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await ProductService.updateProduct(req.params.id, req.body);
    sendResponse(res, 200, {
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await ProductService.deleteProduct(req.params.id);
    sendResponse(res, 200, {
      success: true,
      message: "Product deleted successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

import { Request, Response, NextFunction } from "express";
import { OrderService } from "./order.service";
import { sendResponse } from "../../lib/sendResponse";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await OrderService.createOrder(req.user!.id, req.body.items);
    sendResponse(res, 201, {
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await OrderService.getAllOrders();
    sendResponse(res, 200, {
      success: true,
      message: "Orders fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await OrderService.getOrderById((req.params.id as string));
    sendResponse(res, 200, {
      success: true,
      message: "Order fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await OrderService.updateOrderStatus(
      (req.params.id as string),
      req.body.status,
    );
    sendResponse(res, 200, {
      success: true,
      message: "Order status updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await OrderService.deleteOrder((req.params.id as string));
    sendResponse(res, 200, {
      success: true,
      message: "Order deleted successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};

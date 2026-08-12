import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
import { sendResponse } from "../../lib/sendResponse";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.registerUser(req.body);
    sendResponse(res, 201, {
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.loginUser(req.body);
    sendResponse(res, 200, {
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    sendResponse(res, 200, {
      success: true,
      message: "Profile fetched successfully",
      data: req.user,
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  register,
  login,
  getMe,
};

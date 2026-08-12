import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../lib/AppError";
import { Role } from "@prisma/client";

export const auth = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError(401, "You are not authorized. No token provided.");
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as JwtPayload;

      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };

      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        throw new AppError(
          403,
          "You do not have permission to perform this action.",
        );
      }

      next();
    } catch (err) {
      if (err instanceof AppError) {
        return next(err);
      }
      next(new AppError(401, "Invalid or expired token"));
    }
  };
};

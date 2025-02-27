import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AppError from "./errorHandler/error_handler";

dotenv.config(); // Load environment variables from .env file

// Extend the Request type to include the user property
interface AuthRequest extends Request {
  user?: any;
}

const authenticateJWT = (req: Request, res: Response, next: NextFunction):any => {
  const token = req.header("Authorization")?.split(" ")[1]; // Expect "Bearer <token>"
  if (!token) {
    return next(AppError.unauthorized("No token provided"));
  }

  try {
    const secretKey = process.env.JWT_SECRET as string;
    if (!secretKey) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const decoded = jwt.verify(token, secretKey);
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    return AppError.forbidden("Invalid token");
  }
};

export default authenticateJWT;

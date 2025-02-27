import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import AppError from "../errorHandler/error_handler";
export const validateSignupBody = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("name")
    .isString()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters"),
  body("password")
    .isString()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8-20 characters long"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    console.log("ERROR------",errors)
    if (!errors.isEmpty()) {
      return next(AppError.requiredFields(errors.array()));
    }
    next();
  },
];
export const validateLoginBody = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isString()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8-20 characters long"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(AppError.requiredFields(errors.array()));
    }
    next();
  },
];


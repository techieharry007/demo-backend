import { NextFunction, Request, Response } from "express";
import AppError from "../middleware/errorHandler/error_handler";
import AppResponse from "../middleware/responseHandler/response_handler";
import { User } from "../model/User";
import {
  comparePassword,
  generateJWTToken,
  generatePassword,
} from "../utils/helper";

export const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    console.log("first",name, email, password)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(AppError.badRequest("Email already exists"));
    }
    const hash = await generatePassword(password);
    const user = new User({ email: email, name: name, password: hash });
    user.save();
    AppResponse.success(res, "User created successfully", {});
  } catch (err) {
    next(err);
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const existingUser = (await User.findOne({ email })) as any;
    if (!existingUser) {
      return next(AppError.badRequest("User does not exist"));
    }
    const isValidPassword = await comparePassword(
      password,
      existingUser.password
    );
    if (!isValidPassword) {
      return next(AppError.badRequest("Invalid password"));
    }
    const token = generateJWTToken(existingUser.id);
    const { name } = existingUser;
    AppResponse.success(res, "login successful", {token,name });
  } catch (err) {
    next(err);
  }
};

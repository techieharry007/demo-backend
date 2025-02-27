import { NextFunction, Request, Response } from "express";
import { Tasks } from "../model/Task";
import AppResponse from "../middleware/responseHandler/response_handler";
import { Types } from "mongoose";
import AppError from "../middleware/errorHandler/error_handler";

export const getTaskList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Tasks.find();
    if (!task.length) AppResponse.success(res, "No task found", {});
    AppResponse.success(res, "Task list", task);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description } = req.body;
    const task = await Tasks.create({ title: title, description: description });
    task.save();
    AppResponse.success(res, "Task created", {});
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, title, description } = req.body;

    // Ensure the ID is valid
    if (!id || !Types.ObjectId.isValid(id)) {
      return next(AppError.badRequest("Invalid task Id"));
    }

    // Build the update object dynamically
    const updateFields: Partial<{ title: string; description: string }> = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;

    // If there are no fields to update, return an error
    if (Object.keys(updateFields).length === 0) {
      return next(AppError.badRequest("No valid fields to update"));
    }

    // Find and update the task
    const task = await Tasks.findByIdAndUpdate(id, updateFields, { new: true });

    if (!task) {
      return next(AppError.badRequest("No valid fields to update"));
    }

    AppResponse.success(res, "Task updated successfully", task);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    await Tasks.findByIdAndDelete(id);
    AppResponse.success(res, "Task deleted", {});
  } catch (err) {
    next(err);
  }
};

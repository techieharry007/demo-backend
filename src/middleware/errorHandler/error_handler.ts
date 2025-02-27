class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(typeof message === "object" ? JSON.stringify(message) : message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string = "Bad Request") {
    return new AppError(message, 400);
  }
  static requiredFields(arg:any[]) {
    return new AppError(arg.map((err: any) => `${err?.path}: ${err.msg}`).join(", "), 400);
  }

  static unauthorized(message: string = "Unauthorized") {
    return new AppError(message, 401);
  }

  static forbidden(message: string = "Forbidden") {
    return new AppError(message, 403);
  }

  static notFound(message: string = "Not Found") {
    return new AppError(message, 404);
  }

  static internalServerError(message: string = "Internal Server Error") {
    return new AppError(message, 500);
  }
}

export default AppError;

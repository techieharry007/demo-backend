import { Request, Response, NextFunction } from "express";

export interface IResponse extends Response {
  error?: (code: number, message: string) => Response;
  success?: (code: number, message: string, result: any) => Response;
}

const routeHandler = (req: Request, res: IResponse, next: NextFunction) => {
  res.error = (statusCode: number, errorMessage: string) =>
    res.status(statusCode).json({ error: errorMessage });

  res.success = (statusCode: number, message: string, result: any) =>
    res.status(statusCode).json({ message, result });

  return next();
};

export default routeHandler;

import { Response } from 'express';

interface IResponse<T = any> {
  status: string;
  message: string;
  data?: T;
}

class AppResponse {
  static success<T>(res: Response, message: string, data: T) {
    const response: IResponse<T> = {
      status: 'success',
      message,
      data,
    };
    return res.status(200).json(response);
  }

  static created<T>(res: Response, message: string, data: T) {
    const response: IResponse<T> = {
      status: 'success',
      message,
      data,
    };
    return res.status(201).json(response);
  }

  static noContent(res: Response, message: string = 'No content') {
    return res.status(204).json({
      status: 'success',
      message,
    });
  }

  static customResponse<T>(
    res: Response,
    statusCode: number = 200,
    message: string,
    data?: T
  ) {
    const response: IResponse<T> = {
      status: 'success',
      message,
      data,
    };
    return res.status(statusCode).json(response);
  }
}

export default AppResponse;

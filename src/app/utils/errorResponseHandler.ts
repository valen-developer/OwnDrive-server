import { Response } from "express";

export const errorReponseHandler = (error: any, res: Response) => {
  let statusCode = 500;

  if (error.statusCode) statusCode = error.statusCode;

  res.status(statusCode).json({
    ok: false,
    error: error.message,
  });
};

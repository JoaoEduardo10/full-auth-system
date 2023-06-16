/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { ApiErrors } from "../../server/errors/api-errors";

export const globalsErrors = async (
  error: Error & Partial<ApiErrors>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;

  return res.status(statusCode).json({ error: error.message });
};

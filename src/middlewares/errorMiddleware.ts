import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      errors: err.issues,
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

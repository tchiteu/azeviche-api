import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import { ZodError } from 'zod';

export const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    const message = error.message;
    res.status(error.statusCode).json({ message });
    return;
  }

  if (error instanceof ZodError) {
    const issues = error.errors.map((err) => ({
      path: err.path,
      message: err.message,
    }));

    res.status(400).json({ message: 'Validation error', issues });
    return;
  }

  res.status(500).json({ message: 'Algo deu errado...' }).send();
};

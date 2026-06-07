import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ZodError } from 'zod';

import { AppError } from '../errors/AppError';
import { isProd } from '../config/env';

// Wraps async route handlers so thrown/rejected errors reach the error middleware
// instead of crashing the process.
export function asyncHandler(handler: RequestHandler): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({ error: { message: `Route not found: ${req.method} ${req.path}` } });
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: { message: 'Validation failed', details: err.flatten().fieldErrors },
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: { message: err.message } });
    return;
  }

  console.error('Unexpected error:', err);
  res.status(500).json({
    error: { message: isProd ? 'Internal server error' : String(err) },
  });
}

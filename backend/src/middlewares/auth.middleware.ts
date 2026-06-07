import { NextFunction, Request, Response } from 'express';

import { ACCESS_COOKIE } from '../utils/cookies';
import { verifyAccessToken } from '../utils/jwt';
import { UnauthorizedError } from '../errors/AppError';

// Guards protected routes: requires a valid access-token cookie and attaches the
// decoded user to `req.user`.
export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const token = req.cookies?.[ACCESS_COOKIE] as string | undefined;
  if (!token) {
    throw new UnauthorizedError('Authentication required');
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.sub, email: payload.email };
    next();
  } catch {
    throw new UnauthorizedError('Invalid or expired token');
  }
}

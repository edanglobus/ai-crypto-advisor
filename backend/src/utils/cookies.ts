import { Response } from 'express';

import { env, isProd } from '../config/env';
import { parseDurationToMs } from './duration';

export const ACCESS_COOKIE = 'access_token';
export const REFRESH_COOKIE = 'refresh_token';

// Scope the refresh cookie to the auth routes so it is only sent where it is needed.
const REFRESH_COOKIE_PATH = '/api/auth';

const baseCookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? ('none' as const) : ('lax' as const),
};

export function setAuthCookies(
  res: Response,
  tokens: { accessToken: string; refreshToken: string },
): void {
  res.cookie(ACCESS_COOKIE, tokens.accessToken, {
    ...baseCookieOptions,
    maxAge: parseDurationToMs(env.ACCESS_TOKEN_TTL),
  });
  res.cookie(REFRESH_COOKIE, tokens.refreshToken, {
    ...baseCookieOptions,
    path: REFRESH_COOKIE_PATH,
    maxAge: parseDurationToMs(env.REFRESH_TOKEN_TTL),
  });
}

export function clearAuthCookies(res: Response): void {
  res.clearCookie(ACCESS_COOKIE, baseCookieOptions);
  res.clearCookie(REFRESH_COOKIE, { ...baseCookieOptions, path: REFRESH_COOKIE_PATH });
}

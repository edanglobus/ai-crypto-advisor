import { Request, Response } from 'express';

import { authService } from '../services/auth.service';
import { preferenceService } from '../services/preference.service';
import { loginSchema, registerSchema } from '../validators/auth.validator';
import { setAuthCookies, clearAuthCookies, REFRESH_COOKIE } from '../utils/cookies';
import { UnauthorizedError } from '../errors/AppError';

export const authController = {
  async register(req: Request, res: Response): Promise<void> {
    const input = registerSchema.parse(req.body);
    const { user, tokens } = await authService.register(input);
    setAuthCookies(res, tokens);
    res.status(201).json({ user });
  },

  async login(req: Request, res: Response): Promise<void> {
    const input = loginSchema.parse(req.body);
    const { user, tokens } = await authService.login(input);
    setAuthCookies(res, tokens);
    res.status(200).json({ user });
  },

  async refresh(req: Request, res: Response): Promise<void> {
    const rawToken = req.cookies?.[REFRESH_COOKIE] as string | undefined;
    const { user, tokens } = await authService.rotateRefreshToken(rawToken);
    setAuthCookies(res, tokens);
    res.status(200).json({ user });
  },

  async logout(req: Request, res: Response): Promise<void> {
    const rawToken = req.cookies?.[REFRESH_COOKIE] as string | undefined;
    await authService.logout(rawToken);
    clearAuthCookies(res);
    res.status(204).send();
  },

  async me(req: Request, res: Response): Promise<void> {
    if (!req.user) {
      throw new UnauthorizedError('Authentication required');
    }
    const [user, hasCompletedOnboarding] = await Promise.all([
      authService.getMe(req.user.id),
      preferenceService.hasCompletedOnboarding(req.user.id),
    ]);
    res.status(200).json({ user, hasCompletedOnboarding });
  },
};

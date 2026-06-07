import { Request, Response } from 'express';

import { dashboardService } from '../services/dashboard.service';
import { UnauthorizedError } from '../errors/AppError';

function requireUserId(req: Request): string {
  if (!req.user) {
    throw new UnauthorizedError('Authentication required');
  }
  return req.user.id;
}

// A user-initiated refresh (?refresh=true) bypasses the server cache.
function isForced(req: Request): boolean {
  return req.query.refresh === 'true';
}

export const dashboardController = {
  async getMarket(req: Request, res: Response): Promise<void> {
    requireUserId(req);
    const market = await dashboardService.getMarket(isForced(req));
    res.status(200).json({ market });
  },

  async getPrices(req: Request, res: Response): Promise<void> {
    const prices = await dashboardService.getPrices(requireUserId(req), isForced(req));
    res.status(200).json({ prices });
  },

  async getNews(req: Request, res: Response): Promise<void> {
    const result = await dashboardService.getNews(requireUserId(req), isForced(req));
    res.status(200).json(result);
  },

  async getInsight(req: Request, res: Response): Promise<void> {
    const result = await dashboardService.getInsight(requireUserId(req), isForced(req));
    res.status(200).json(result);
  },

  async getMeme(req: Request, res: Response): Promise<void> {
    requireUserId(req);
    res.status(200).json({ meme: dashboardService.getMeme() });
  },
};

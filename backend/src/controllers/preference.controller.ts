import { Request, Response } from 'express';

import { preferenceService } from '../services/preference.service';
import { upsertPreferenceSchema } from '../validators/preference.validator';
import { UnauthorizedError } from '../errors/AppError';

export const preferenceController = {
  async getMine(req: Request, res: Response): Promise<void> {
    if (!req.user) {
      throw new UnauthorizedError('Authentication required');
    }
    const preferences = await preferenceService.getForUser(req.user.id);
    res.status(200).json({ preferences });
  },

  async upsertMine(req: Request, res: Response): Promise<void> {
    if (!req.user) {
      throw new UnauthorizedError('Authentication required');
    }
    const input = upsertPreferenceSchema.parse(req.body);
    const preferences = await preferenceService.save(req.user.id, input);
    res.status(200).json({ preferences });
  },
};

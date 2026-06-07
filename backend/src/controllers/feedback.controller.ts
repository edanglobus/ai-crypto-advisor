import { Request, Response } from 'express';

import { feedbackService } from '../services/feedback.service';
import { castVoteSchema } from '../validators/feedback.validator';
import { UnauthorizedError } from '../errors/AppError';

function requireUserId(req: Request): string {
  if (!req.user) {
    throw new UnauthorizedError('Authentication required');
  }
  return req.user.id;
}

export const feedbackController = {
  async castVote(req: Request, res: Response): Promise<void> {
    const input = castVoteSchema.parse(req.body);
    const feedback = await feedbackService.castVote(requireUserId(req), input);
    res.status(200).json({ feedback });
  },

  async getMine(req: Request, res: Response): Promise<void> {
    const feedback = await feedbackService.getUserVotes(requireUserId(req));
    res.status(200).json({ feedback });
  },
};

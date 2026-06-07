import { Feedback, Prisma } from '@prisma/client';

import { feedbackRepository } from '../repositories/feedback.repository';
import type { CastVoteInput } from '../validators/feedback.validator';

export const feedbackService = {
  // Append-only event log: every vote is recorded; nothing is updated or deleted.
  castVote(userId: string, input: CastVoteInput): Promise<Feedback> {
    return feedbackRepository.create({
      userId,
      contentType: input.contentType,
      vote: input.vote,
      context: input.context as Prisma.InputJsonValue | undefined,
    });
  },

  getUserVotes(userId: string): Promise<Feedback[]> {
    return feedbackRepository.findByUser(userId);
  },
};

import { Feedback } from '@prisma/client';

import { feedbackRepository } from '../repositories/feedback.repository';
import type { CastVoteInput } from '../validators/feedback.validator';

export const feedbackService = {
  // Per-user toggle: same vote again removes it, a different vote flips it.
  // Returns the resulting Feedback, or null when the vote was toggled off.
  async castVote(userId: string, input: CastVoteInput): Promise<Feedback | null> {
    const existing = await feedbackRepository.findByUserAndContent(
      userId,
      input.contentType,
      input.contentRef,
    );

    if (!existing) {
      return feedbackRepository.create({ userId, ...input });
    }

    if (existing.vote === input.vote) {
      await feedbackRepository.deleteById(existing.id);
      return null;
    }

    return feedbackRepository.updateVote(existing.id, input.vote);
  },

  getUserVotes(userId: string): Promise<Feedback[]> {
    return feedbackRepository.findByUser(userId);
  },
};

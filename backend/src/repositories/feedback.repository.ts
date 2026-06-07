import { ContentType, Feedback, VoteType } from '@prisma/client';

import { prisma } from '../lib/prisma';

export const feedbackRepository = {
  // Append-only: each vote is stored as its own row.
  create(data: {
    userId: string;
    contentType: ContentType;
    contentRef: string;
    vote: VoteType;
  }): Promise<Feedback> {
    return prisma.feedback.create({ data });
  },

  findByUser(userId: string): Promise<Feedback[]> {
    return prisma.feedback.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  },
};

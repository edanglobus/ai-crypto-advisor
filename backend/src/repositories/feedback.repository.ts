import { ContentType, Feedback, Prisma, VoteType } from '@prisma/client';

import { prisma } from '../lib/prisma';

export const feedbackRepository = {
  // Append-only: each vote is stored as its own row with a context snapshot.
  create(data: {
    userId: string;
    contentType: ContentType;
    vote: VoteType;
    context?: Prisma.InputJsonValue;
  }): Promise<Feedback> {
    return prisma.feedback.create({ data });
  },

  findByUser(userId: string): Promise<Feedback[]> {
    return prisma.feedback.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  },
};

import { ContentType, Feedback, VoteType } from '@prisma/client';

import { prisma } from '../lib/prisma';

export const feedbackRepository = {
  findByUserAndContent(
    userId: string,
    contentType: ContentType,
    contentRef: string,
  ): Promise<Feedback | null> {
    return prisma.feedback.findUnique({
      where: { userId_contentType_contentRef: { userId, contentType, contentRef } },
    });
  },

  create(data: {
    userId: string;
    contentType: ContentType;
    contentRef: string;
    vote: VoteType;
  }): Promise<Feedback> {
    return prisma.feedback.create({ data });
  },

  updateVote(id: string, vote: VoteType): Promise<Feedback> {
    return prisma.feedback.update({ where: { id }, data: { vote } });
  },

  async deleteById(id: string): Promise<void> {
    await prisma.feedback.delete({ where: { id } });
  },

  findByUser(userId: string): Promise<Feedback[]> {
    return prisma.feedback.findMany({ where: { userId }, orderBy: { updatedAt: 'desc' } });
  },
};

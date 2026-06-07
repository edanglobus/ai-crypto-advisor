import { UserPreference } from '@prisma/client';

import { prisma } from '../lib/prisma';
import type { UpsertPreferenceInput } from '../validators/preference.validator';

export const preferenceRepository = {
  findByUserId(userId: string): Promise<UserPreference | null> {
    return prisma.userPreference.findUnique({ where: { userId } });
  },

  upsert(userId: string, data: UpsertPreferenceInput): Promise<UserPreference> {
    return prisma.userPreference.upsert({
      where: { userId },
      create: { userId, ...data },
      update: data,
    });
  },

  async existsForUser(userId: string): Promise<boolean> {
    const count = await prisma.userPreference.count({ where: { userId } });
    return count > 0;
  },
};

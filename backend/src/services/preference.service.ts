import { UserPreference } from '@prisma/client';

import { preferenceRepository } from '../repositories/preference.repository';
import type { UpsertPreferenceInput } from '../validators/preference.validator';

export const preferenceService = {
  getForUser(userId: string): Promise<UserPreference | null> {
    return preferenceRepository.findByUserId(userId);
  },

  // Creates or replaces the user's onboarding answers.
  save(userId: string, input: UpsertPreferenceInput): Promise<UserPreference> {
    return preferenceRepository.upsert(userId, input);
  },

  hasCompletedOnboarding(userId: string): Promise<boolean> {
    return preferenceRepository.existsForUser(userId);
  },
};

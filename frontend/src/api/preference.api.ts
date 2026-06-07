import { apiClient } from './client';
import type { ContentType } from './feedback.api';

// String-literal unions mirroring the backend Prisma enums.
export type InvestorType = 'HODLER' | 'DAY_TRADER' | 'NFT_COLLECTOR';

// Onboarding section choices reuse the dashboard's ContentType (NEWS/PRICES/AI_INSIGHT/MEME).
export interface Preferences {
  id: string;
  userId: string;
  favoriteCoins: string[];
  investorType: InvestorType;
  contentPreferences: ContentType[];
  createdAt: string;
  updatedAt: string;
}

export interface SavePreferencesPayload {
  favoriteCoins: string[];
  investorType: InvestorType;
  contentPreferences: ContentType[];
}

export const preferenceApi = {
  get: (): Promise<Preferences | null> =>
    apiClient
      .get<{ preferences: Preferences | null }>('/preferences')
      .then((res) => res.data.preferences),

  save: (payload: SavePreferencesPayload): Promise<Preferences> =>
    apiClient
      .put<{ preferences: Preferences }>('/preferences', payload)
      .then((res) => res.data.preferences),
};

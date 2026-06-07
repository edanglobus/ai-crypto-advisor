import { ContentType, InvestorType } from '@prisma/client';
import { z } from 'zod';

// Onboarding quiz payload — mirrors the three assignment questions. Uses Prisma's
// generated enums so the API and database stay in lockstep.
export const upsertPreferenceSchema = z.object({
  favoriteCoins: z
    .array(z.string().trim().min(1, 'Coin cannot be empty'))
    .min(1, 'Pick at least one crypto asset')
    .max(50, 'Too many assets selected'),
  investorType: z.nativeEnum(InvestorType),
  contentPreferences: z
    .array(z.nativeEnum(ContentType))
    .min(1, 'Pick at least one section'),
});

export type UpsertPreferenceInput = z.infer<typeof upsertPreferenceSchema>;

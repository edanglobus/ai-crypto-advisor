import { ContentType, VoteType } from '@prisma/client';
import { z } from 'zod';

// A vote on a specific dashboard item. contentRef is the item's id from the
// dashboard endpoints (coin id, news id, `insight-YYYY-MM-DD`, or meme id).
export const castVoteSchema = z.object({
  contentType: z.nativeEnum(ContentType),
  contentRef: z.string().trim().min(1, 'contentRef is required').max(200),
  vote: z.nativeEnum(VoteType),
});

export type CastVoteInput = z.infer<typeof castVoteSchema>;

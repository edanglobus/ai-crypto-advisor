import { ContentType, VoteType } from '@prisma/client';
import { z } from 'zod';

// A vote on a dashboard section, with a snapshot of what was shown at the time
// (coins, headlines, insight/meme info, shownAt timestamp).
export const castVoteSchema = z.object({
  contentType: z.nativeEnum(ContentType),
  vote: z.nativeEnum(VoteType),
  context: z.record(z.unknown()).optional(),
});

export type CastVoteInput = z.infer<typeof castVoteSchema>;

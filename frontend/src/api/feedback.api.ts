import { apiClient } from './client';

export type ContentType = 'NEWS' | 'PRICES' | 'AI_INSIGHT' | 'MEME';
export type VoteType = 'UP' | 'DOWN';

export interface Feedback {
  id: string;
  userId: string;
  contentType: ContentType;
  contentRef: string;
  vote: VoteType;
  createdAt: string;
  updatedAt: string;
}

export interface CastVotePayload {
  contentType: ContentType;
  contentRef: string;
  vote: VoteType;
}

export const feedbackApi = {
  getMine: (): Promise<Feedback[]> =>
    apiClient.get<{ feedback: Feedback[] }>('/feedback').then((res) => res.data.feedback),

  // Returns the resulting Feedback, or null when the vote was toggled off.
  castVote: (payload: CastVotePayload): Promise<Feedback | null> =>
    apiClient.post<{ feedback: Feedback | null }>('/feedback', payload).then((res) => res.data.feedback),
};

// Stable key for looking up a vote on a specific item.
export const voteKey = (contentType: ContentType, contentRef: string): string =>
  `${contentType}:${contentRef}`;

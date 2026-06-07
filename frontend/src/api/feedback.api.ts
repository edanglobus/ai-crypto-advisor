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

  // Appends a vote (event log) and returns the created Feedback.
  castVote: (payload: CastVotePayload): Promise<Feedback> =>
    apiClient.post<{ feedback: Feedback }>('/feedback', payload).then((res) => res.data.feedback),
};

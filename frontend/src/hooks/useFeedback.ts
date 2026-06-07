import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { feedbackApi, voteKey, type Feedback, type VoteType } from '../api/feedback.api';

export const FEEDBACK_QUERY_KEY = ['feedback'] as const;

export function useMyVotes() {
  return useQuery({
    queryKey: FEEDBACK_QUERY_KEY,
    queryFn: feedbackApi.getMine,
  });
}

// Lookup map: `${contentType}:${contentRef}` -> VoteType, for O(1) UI reads.
export function useVotesMap(): Map<string, VoteType> {
  const { data } = useMyVotes();
  return useMemo(() => {
    const map = new Map<string, VoteType>();
    (data ?? []).forEach((f) => map.set(voteKey(f.contentType, f.contentRef), f.vote));
    return map;
  }, [data]);
}

export function useVote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: feedbackApi.castVote,
    // Optimistically apply the toggle/flip/remove before the request resolves.
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: FEEDBACK_QUERY_KEY });
      const previous = queryClient.getQueryData<Feedback[]>(FEEDBACK_QUERY_KEY) ?? [];

      const matches = (f: Feedback) =>
        f.contentType === input.contentType && f.contentRef === input.contentRef;
      const existing = previous.find(matches);

      let next: Feedback[];
      if (!existing) {
        const now = new Date().toISOString();
        next = [
          ...previous,
          { id: `optimistic-${voteKey(input.contentType, input.contentRef)}`, userId: '', ...input, createdAt: now, updatedAt: now },
        ];
      } else if (existing.vote === input.vote) {
        next = previous.filter((f) => !matches(f)); // toggle off
      } else {
        next = previous.map((f) => (matches(f) ? { ...f, vote: input.vote } : f)); // flip
      }

      queryClient.setQueryData(FEEDBACK_QUERY_KEY, next);
      return { previous };
    },
    onError: (_error, _input, context) => {
      if (context?.previous) {
        queryClient.setQueryData(FEEDBACK_QUERY_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: FEEDBACK_QUERY_KEY });
    },
  });
}

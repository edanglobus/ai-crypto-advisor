import { useMutation } from '@tanstack/react-query';

import { feedbackApi } from '../api/feedback.api';

// Appends a vote to the feedback event log. Fire-and-forget — the UI shows a
// brief confirmation and resets after each click, so no cached "current vote".
export function useVote() {
  return useMutation({
    mutationFn: feedbackApi.castVote,
  });
}

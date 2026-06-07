import { useState } from 'react';

import { useVote, useVotesMap } from '../../hooks/useFeedback';
import { voteKey, type ContentType } from '../../api/feedback.api';
import { VoteButtons } from './VoteButtons';

// All section-level votes share a constant contentRef — one vote per section per user.
const SECTION_REF = 'section';

interface SectionFeedbackProps {
  contentType: ContentType;
}

// "Helpful? 👍 👎" for a whole section. After voting, it hides itself until the
// section is refreshed (the parent remounts it via a `key` on refetch).
export function SectionFeedback({ contentType }: SectionFeedbackProps) {
  const votes = useVotesMap();
  const vote = useVote();
  const [voted, setVoted] = useState(false);

  if (voted) return null;

  const current = votes.get(voteKey(contentType, SECTION_REF)) ?? null;

  return (
    <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
      <span className="text-xs text-slate-400">Helpful?</span>
      <VoteButtons
        current={current}
        onVote={(v) => {
          vote.mutate({ contentType, contentRef: SECTION_REF, vote: v });
          setVoted(true);
        }}
      />
    </div>
  );
}

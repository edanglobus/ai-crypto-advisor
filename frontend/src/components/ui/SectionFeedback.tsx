import { useEffect, useRef, useState } from 'react';

import { useVote } from '../../hooks/useFeedback';
import type { ContentType, VoteType } from '../../api/feedback.api';
import { VoteButtons } from './VoteButtons';

interface SectionFeedbackProps {
  contentType: ContentType;
  context?: Record<string, unknown>;
}

// "Helpful? 👍 👎" for a section. Each click is recorded (append-only) with a
// snapshot of what was shown; the button shows a brief thanks, then resets.
export function SectionFeedback({ contentType, context }: SectionFeedbackProps) {
  const vote = useVote();
  const [thanks, setThanks] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleVote = (value: VoteType) => {
    vote.mutate({ contentType, vote: value, context });
    setThanks(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setThanks(false), 1500);
  };

  return (
    <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
      {thanks ? (
        <span className="text-xs text-emerald-600">Thanks for your feedback!</span>
      ) : (
        <>
          <span className="text-xs text-slate-400">Helpful?</span>
          <VoteButtons current={null} onVote={handleVote} />
        </>
      )}
    </div>
  );
}

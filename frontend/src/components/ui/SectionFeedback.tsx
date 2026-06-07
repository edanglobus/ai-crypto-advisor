import { useEffect, useRef, useState } from 'react';

import { useVote } from '../../hooks/useFeedback';
import type { ContentType, VoteType } from '../../api/feedback.api';
import { VoteButtons } from './VoteButtons';

interface SectionFeedbackProps {
  contentType: ContentType;
  contentRef: string;
}

// "Helpful? 👍 👎" for a section. Each click is recorded (append-only); the button
// shows a brief thanks, then resets to neutral so more feedback can be given.
export function SectionFeedback({ contentType, contentRef }: SectionFeedbackProps) {
  const vote = useVote();
  const [thanks, setThanks] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleVote = (value: VoteType) => {
    vote.mutate({ contentType, contentRef, vote: value });
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

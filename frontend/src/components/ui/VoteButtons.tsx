import { motion } from 'framer-motion';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

import type { VoteType } from '../../api/feedback.api';

interface VoteButtonsProps {
  current: VoteType | null;
  onVote: (vote: VoteType) => void;
}

export function VoteButtons({ current, onVote }: VoteButtonsProps) {
  return (
    <div className="flex items-center gap-1">
      <motion.button
        type="button"
        onClick={() => onVote('UP')}
        aria-pressed={current === 'UP'}
        aria-label="Thumbs up"
        whileTap={{ scale: 0.8 }}
        animate={{ scale: current === 'UP' ? [1, 1.25, 1] : 1 }}
        transition={{ duration: 0.25 }}
        className={`rounded-md p-1.5 transition-colors ${
          current === 'UP'
            ? 'bg-emerald-50 text-emerald-600'
            : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
        }`}
      >
        <ThumbsUp className="h-4 w-4" />
      </motion.button>
      <motion.button
        type="button"
        onClick={() => onVote('DOWN')}
        aria-pressed={current === 'DOWN'}
        aria-label="Thumbs down"
        whileTap={{ scale: 0.8 }}
        animate={{ scale: current === 'DOWN' ? [1, 1.25, 1] : 1 }}
        transition={{ duration: 0.25 }}
        className={`rounded-md p-1.5 transition-colors ${
          current === 'DOWN'
            ? 'bg-red-50 text-red-600'
            : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
        }`}
      >
        <ThumbsDown className="h-4 w-4" />
      </motion.button>
    </div>
  );
}

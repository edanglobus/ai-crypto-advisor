import { RefreshCw } from 'lucide-react';

interface RefreshButtonProps {
  onClick: () => void;
  spinning?: boolean;
  label?: string;
}

export function RefreshButton({ onClick, spinning = false, label = 'Refresh' }: RefreshButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
    >
      <RefreshCw className={`h-4 w-4 ${spinning ? 'animate-spin' : ''}`} />
    </button>
  );
}

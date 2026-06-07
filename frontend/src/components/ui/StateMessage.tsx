import { Button } from './Button';

interface StateMessageProps {
  label: string;
  onRetry?: () => void;
}

// Centered empty/error state for a dashboard section, with an optional retry.
export function StateMessage({ label, onRetry }: StateMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <p className="text-sm text-slate-500">{label}</p>
      {onRetry && (
        <Button variant="ghost" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}

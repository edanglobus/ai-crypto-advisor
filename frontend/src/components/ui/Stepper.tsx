import { Check } from 'lucide-react';

interface StepperProps {
  steps: string[];
  current: number;
}

export function Stepper({ steps, current }: StepperProps) {
  return (
    <div className="flex items-center">
      {steps.map((label, index) => {
        const isComplete = index < current;
        const isActive = index === current;
        const isLast = index === steps.length - 1;

        return (
          <div key={label} className={`flex items-center ${isLast ? '' : 'flex-1'}`}>
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors ${
                  isComplete
                    ? 'border-brand bg-brand text-white'
                    : isActive
                      ? 'border-brand bg-white text-brand'
                      : 'border-slate-300 bg-white text-slate-400'
                }`}
              >
                {isComplete ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  isActive ? 'text-brand' : 'text-slate-500'
                }`}
              >
                {label}
              </span>
            </div>
            {!isLast && (
              <div
                className={`mx-2 h-0.5 flex-1 rounded transition-colors ${
                  isComplete ? 'bg-brand' : 'bg-slate-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

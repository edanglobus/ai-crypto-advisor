import { CONTENT_OPTIONS } from '../../../constants/onboarding';
import type { ContentType } from '../../../api/feedback.api';
import { SelectableOptionCard } from '../../ui/SelectableOptionCard';

interface StepContentProps {
  selected: ContentType[];
  onToggle: (value: ContentType) => void;
}

export function StepContent({ selected, onToggle }: StepContentProps) {
  return (
    <div className="space-y-3">
      {CONTENT_OPTIONS.map((option) => (
        <SelectableOptionCard
          key={option.value}
          title={option.label}
          description={option.description}
          Icon={option.Icon}
          selected={selected.includes(option.value)}
          onSelect={() => onToggle(option.value)}
        />
      ))}
      <p className="text-xs text-slate-500">
        Coin prices are always shown. Pick at least one extra section.
      </p>
    </div>
  );
}

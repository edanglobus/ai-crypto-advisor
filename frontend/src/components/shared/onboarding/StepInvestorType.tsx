import { INVESTOR_TYPES } from '../../../constants/onboarding';
import type { InvestorType } from '../../../api/preference.api';
import { SelectableOptionCard } from '../../ui/SelectableOptionCard';

interface StepInvestorTypeProps {
  value: InvestorType | null;
  onChange: (value: InvestorType) => void;
}

export function StepInvestorType({ value, onChange }: StepInvestorTypeProps) {
  return (
    <div className="space-y-3">
      {INVESTOR_TYPES.map((option) => (
        <SelectableOptionCard
          key={option.value}
          title={option.label}
          description={option.description}
          Icon={option.Icon}
          selected={value === option.value}
          onSelect={() => onChange(option.value)}
        />
      ))}
    </div>
  );
}

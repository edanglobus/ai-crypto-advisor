import { Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface SelectableOptionCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  selected: boolean;
  onSelect: () => void;
}

export function SelectableOptionCard({
  title,
  description,
  Icon,
  selected,
  onSelect,
}: SelectableOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group relative flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
        selected
          ? 'border-brand bg-brand/5 shadow-card'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
      }`}
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
          selected ? 'bg-brand text-white' : 'bg-slate-100 text-slate-500'
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-slate-900">{title}</p>
        <p className="mt-0.5 text-sm text-slate-500">{description}</p>
      </div>
      <span
        className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
          selected ? 'border-brand bg-brand text-white' : 'border-slate-300'
        }`}
      >
        {selected && <Check className="h-3.5 w-3.5" />}
      </span>
    </button>
  );
}

import { Check } from 'lucide-react';

import type { CryptoAsset } from '../../data/cryptoAssets';

interface AssetToggleProps {
  asset: CryptoAsset;
  selected: boolean;
  onToggle: () => void;
}

export function AssetToggle({ asset, selected, onToggle }: AssetToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`relative flex items-center gap-3 rounded-2xl border p-3 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
        selected
          ? 'border-brand bg-brand/5'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
          selected ? 'bg-brand text-white' : 'bg-slate-100 text-slate-500'
        }`}
      >
        {asset.symbol.slice(0, 4)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-slate-900">{asset.name}</span>
        <span className="block text-xs text-slate-500">{asset.symbol}</span>
      </span>
      {selected && (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
          <Check className="h-3.5 w-3.5" />
        </span>
      )}
    </button>
  );
}

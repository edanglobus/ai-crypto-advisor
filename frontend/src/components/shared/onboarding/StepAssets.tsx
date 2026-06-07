import { useMemo, useState } from 'react';

import { CRYPTO_ASSETS } from '../../../data/cryptoAssets';
import { AssetToggle } from '../../ui/AssetToggle';
import { SearchInput } from '../../ui/SearchInput';

interface StepAssetsProps {
  selected: string[];
  onToggle: (id: string) => void;
}

export function StepAssets({ selected, onToggle }: StepAssetsProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CRYPTO_ASSETS;
    return CRYPTO_ASSETS.filter(
      (asset) =>
        asset.name.toLowerCase().includes(q) || asset.symbol.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="space-y-4">
      <SearchInput
        placeholder="Search assets..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <div className="grid max-h-80 grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3">
        {filtered.map((asset) => (
          <AssetToggle
            key={asset.id}
            asset={asset}
            selected={selected.includes(asset.id)}
            onToggle={() => onToggle(asset.id)}
          />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-6 text-center text-sm text-slate-500">
            No assets match “{query}”.
          </p>
        )}
      </div>

      <p className="text-xs text-slate-500">
        {selected.length} selected — pick at least one.
      </p>
    </div>
  );
}

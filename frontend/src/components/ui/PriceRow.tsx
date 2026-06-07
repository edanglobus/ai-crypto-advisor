import type { CoinPrice } from '../../api/dashboard.api';
import { formatPercent, formatUsd } from '../../lib/format';
import { Sparkline } from './Sparkline';

interface PriceRowProps {
  price: CoinPrice;
}

export function PriceRow({ price }: PriceRowProps) {
  const up = price.change24h >= 0;

  return (
    <div className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-slate-50">
      <img src={price.image} alt={price.name} className="h-7 w-7 rounded-full" loading="lazy" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-900">{price.name}</p>
        <p className="text-xs text-slate-500">{price.symbol}</p>
      </div>
      <Sparkline data={price.sparkline7d} className="hidden sm:block" />
      <div className="text-right">
        <p className="text-sm font-medium text-slate-900">{formatUsd(price.price)}</p>
        <p className={`text-xs ${up ? 'text-emerald-600' : 'text-red-500'}`}>
          {formatPercent(price.change24h)}
        </p>
      </div>
    </div>
  );
}

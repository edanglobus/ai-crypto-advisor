import { useMarket } from '../../../hooks/useDashboard';
import { formatCompactUsd } from '../../../lib/format';
import { NewsletterSection } from '../../ui/NewsletterSection';
import { Skeleton } from '../../ui/Skeleton';
import { StateMessage } from '../../ui/StateMessage';
import { RefreshButton } from '../../ui/RefreshButton';

interface StatProps {
  label: string;
  value: string;
}

function Stat({ label, value }: StatProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}

export function MarketSection() {
  const { data, isLoading, isError, isFetching, refetch, refresh } = useMarket();

  return (
    <NewsletterSection
      title="Market Overview"
      action={<RefreshButton onClick={refresh} spinning={isFetching} />}
    >
      {isLoading ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : isError || !data ? (
        <StateMessage label="Couldn't load market data." onRetry={() => refetch()} />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Stat label="24h Volume" value={formatCompactUsd(data.totalVolumeUsd)} />
          <Stat label="BTC Dominance" value={`${data.btcDominance.toFixed(1)}%`} />
          <Stat
            label="Fear & Greed"
            value={
              data.fearGreed ? `${data.fearGreed.value} · ${data.fearGreed.classification}` : '—'
            }
          />
        </div>
      )}
    </NewsletterSection>
  );
}

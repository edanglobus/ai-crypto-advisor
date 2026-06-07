import { usePrices } from '../../../hooks/useDashboard';
import { NewsletterSection } from '../../ui/NewsletterSection';
import { PriceRow } from '../../ui/PriceRow';
import { Skeleton } from '../../ui/Skeleton';
import { StateMessage } from '../../ui/StateMessage';
import { RefreshButton } from '../../ui/RefreshButton';
import { SectionFeedback } from '../../ui/SectionFeedback';

export function PricesSection() {
  const { data, isLoading, isError, isFetching, refetch, refresh } = usePrices();
  const contentRef = `prices-${new Date().toISOString().slice(0, 10)}`;

  return (
    <NewsletterSection
      title="Markets"
      action={<RefreshButton onClick={refresh} spinning={isFetching} />}
    >
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : isError ? (
        <StateMessage label="Couldn't load prices." onRetry={() => refetch()} />
      ) : !data || data.length === 0 ? (
        <StateMessage label="No coins to show." />
      ) : (
        <>
          <div className="space-y-1">
            {data.map((price) => (
              <PriceRow key={price.id} price={price} />
            ))}
          </div>
          <SectionFeedback contentType="PRICES" contentRef={contentRef} />
        </>
      )}
    </NewsletterSection>
  );
}

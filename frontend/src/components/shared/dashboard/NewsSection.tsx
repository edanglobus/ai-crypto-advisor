import { useNews } from '../../../hooks/useDashboard';
import { NewsletterSection } from '../../ui/NewsletterSection';
import { NewsRow } from '../../ui/NewsRow';
import { Skeleton } from '../../ui/Skeleton';
import { StateMessage } from '../../ui/StateMessage';
import { RefreshButton } from '../../ui/RefreshButton';
import { SectionFeedback } from '../../ui/SectionFeedback';

export function NewsSection() {
  const { data, isLoading, isError, isFetching, refetch, refresh, dataUpdatedAt } = useNews();

  const action = (
    <div className="flex items-center gap-2">
      {data?.source === 'fallback' && (
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
          offline sample
        </span>
      )}
      <RefreshButton onClick={refresh} spinning={isFetching} />
    </div>
  );

  return (
    <NewsletterSection title="Headlines" action={action}>
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : isError ? (
        <StateMessage label="Couldn't load news." onRetry={() => refetch()} />
      ) : !data || data.news.length === 0 ? (
        <StateMessage label="No news right now." />
      ) : (
        <>
          <div className="space-y-1">
            {data.news.map((item) => (
              <NewsRow key={item.id} item={item} />
            ))}
          </div>
          <SectionFeedback key={dataUpdatedAt} contentType="NEWS" />
        </>
      )}
    </NewsletterSection>
  );
}

import { useInsight } from '../../../hooks/useDashboard';
import { NewsletterSection } from '../../ui/NewsletterSection';
import { Skeleton } from '../../ui/Skeleton';
import { StateMessage } from '../../ui/StateMessage';
import { RefreshButton } from '../../ui/RefreshButton';
import { SectionFeedback } from '../../ui/SectionFeedback';

export function InsightSection() {
  const { data, isLoading, isError, isFetching, refetch, refresh, dataUpdatedAt } = useInsight();

  const action = (
    <div className="flex items-center gap-2">
      {data && (
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
          {data.source === 'ai' ? 'AI generated' : 'sample'}
        </span>
      )}
      <RefreshButton onClick={refresh} spinning={isFetching} />
    </div>
  );

  return (
    <NewsletterSection title="Insight of the Day" action={action}>
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-11/12" />
          <Skeleton className="h-5 w-4/5" />
        </div>
      ) : isError || !data ? (
        <StateMessage label="Couldn't load today's insight." onRetry={() => refetch()} />
      ) : (
        <>
          <blockquote className="border-l-2 border-brand pl-5">
            <p className="font-serif text-xl italic leading-relaxed text-slate-800">
              {data.insight.text}
            </p>
            <cite className="mt-3 block text-xs not-italic text-slate-400">
              — {data.insight.model}
            </cite>
          </blockquote>
          <SectionFeedback key={dataUpdatedAt} contentType="AI_INSIGHT" />
        </>
      )}
    </NewsletterSection>
  );
}

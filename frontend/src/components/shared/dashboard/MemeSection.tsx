import { useState } from 'react';

import { useMeme } from '../../../hooks/useDashboard';
import { NewsletterSection } from '../../ui/NewsletterSection';
import { Skeleton } from '../../ui/Skeleton';
import { StateMessage } from '../../ui/StateMessage';
import { RefreshButton } from '../../ui/RefreshButton';
import { SectionFeedback } from '../../ui/SectionFeedback';

export function MemeSection() {
  const { data, isLoading, isError, isFetching, refetch } = useMeme();
  const [imageError, setImageError] = useState(false);

  const reroll = () => {
    setImageError(false);
    refetch();
  };

  return (
    <NewsletterSection
      title="Parting Shot"
      action={<RefreshButton onClick={reroll} spinning={isFetching} label="New meme" />}
    >
      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : isError || !data ? (
        <StateMessage label="Couldn't load a meme." onRetry={() => refetch()} />
      ) : (
        <>
          <figure className="text-center">
            <div className="flex items-center justify-center overflow-hidden rounded-2xl bg-slate-50 py-4">
              {imageError ? (
                <p className="px-4 py-10 text-sm text-slate-500">{data.title}</p>
              ) : (
                <img
                  src={data.imageUrl}
                  alt={data.title}
                  onError={() => setImageError(true)}
                  className="max-h-80 w-auto object-contain"
                />
              )}
            </div>
            <figcaption className="mt-3 font-serif text-base italic text-slate-600">
              {data.title}
            </figcaption>
          </figure>
          <SectionFeedback
            contentType="MEME"
            context={{ memeId: data.id, title: data.title, shownAt: new Date().toISOString() }}
          />
        </>
      )}
    </NewsletterSection>
  );
}

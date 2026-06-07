import { ExternalLink } from 'lucide-react';

import type { NewsItem } from '../../api/dashboard.api';
import { timeAgo } from '../../lib/format';

interface NewsRowProps {
  item: NewsItem;
}

export function NewsRow({ item }: NewsRowProps) {
  return (
    <div className="rounded-xl px-2 py-2 hover:bg-slate-50">
      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        className="group flex items-start gap-1 text-sm font-medium text-slate-800 hover:text-brand"
      >
        <span className="line-clamp-2">{item.title}</span>
        <ExternalLink className="mt-0.5 h-3 w-3 shrink-0 text-slate-400 group-hover:text-brand" />
      </a>
      <p className="mt-1 text-xs text-slate-500">
        {item.source} · {timeAgo(item.publishedAt)}
      </p>
    </div>
  );
}

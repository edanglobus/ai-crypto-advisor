import { ReactNode } from 'react';

interface NewsletterSectionProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}

// One editorial section of the daily newsletter: a serif heading with an optional
// action, separated from the previous section by a hairline rule.
export function NewsletterSection({ title, action, children }: NewsletterSectionProps) {
  return (
    <section className="border-t border-slate-200 py-9 first:border-t-0">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

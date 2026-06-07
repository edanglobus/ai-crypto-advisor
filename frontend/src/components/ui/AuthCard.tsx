import { ReactNode } from 'react';

import { FadeIn } from './FadeIn';

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <FadeIn className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            <span className="text-brand">AI</span> Crypto Advisor
          </h1>
        </div>
        <div className="rounded-3xl border border-white/60 bg-white/70 p-8 shadow-card backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
        <div className="mt-6 text-center text-sm text-slate-500">{footer}</div>
      </FadeIn>
    </div>
  );
}

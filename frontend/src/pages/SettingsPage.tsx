import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import type { InvestorType, Preferences } from '../api/preference.api';
import type { ContentType } from '../api/feedback.api';
import { usePreferences, useSavePreferences } from '../hooks/usePreferences';
import { getApiErrorMessage } from '../api/errors';
import { FadeIn } from '../components/ui/FadeIn';
import { FullScreenLoader } from '../components/ui/FullScreenLoader';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { StepAssets } from '../components/shared/onboarding/StepAssets';
import { StepInvestorType } from '../components/shared/onboarding/StepInvestorType';
import { StepContent } from '../components/shared/onboarding/StepContent';

function SettingsForm({ initial }: { initial: Preferences }) {
  const navigate = useNavigate();
  const savePreferences = useSavePreferences();

  const [favoriteCoins, setFavoriteCoins] = useState<string[]>(initial.favoriteCoins);
  const [investorType, setInvestorType] = useState<InvestorType | null>(initial.investorType);
  const [contentPreferences, setContentPreferences] = useState<ContentType[]>(
    // Coin Prices always shows, so it isn't an editable section here.
    initial.contentPreferences.filter((c) => c !== 'PRICES'),
  );

  const toggleCoin = (id: string) =>
    setFavoriteCoins((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));

  const toggleContent = (value: ContentType) =>
    setContentPreferences((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value],
    );

  const isValid =
    favoriteCoins.length > 0 && investorType !== null && contentPreferences.length > 0;

  const handleSave = () => {
    if (!isValid || !investorType) return;
    savePreferences.mutate(
      { favoriteCoins, investorType, contentPreferences },
      { onSuccess: () => navigate('/', { replace: true }) },
    );
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-serif text-xl font-semibold text-slate-900">Your assets</h2>
        <p className="mb-4 mt-1 text-sm text-slate-500">The coins your dashboard follows.</p>
        <StepAssets selected={favoriteCoins} onToggle={toggleCoin} />
      </section>

      <section>
        <h2 className="font-serif text-xl font-semibold text-slate-900">Investor type</h2>
        <p className="mb-4 mt-1 text-sm text-slate-500">Tailors your AI insight.</p>
        <StepInvestorType value={investorType} onChange={setInvestorType} />
      </section>

      <section>
        <h2 className="font-serif text-xl font-semibold text-slate-900">Sections</h2>
        <p className="mb-4 mt-1 text-sm text-slate-500">
          Coin prices always show — pick the extras.
        </p>
        <StepContent selected={contentPreferences} onToggle={toggleContent} />
      </section>

      {savePreferences.isError && <Alert message={getApiErrorMessage(savePreferences.error)} />}

      <div className="flex items-center justify-end gap-3">
        <Button variant="ghost" onClick={() => navigate('/')}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!isValid} isLoading={savePreferences.isPending}>
          Save changes
        </Button>
      </div>
    </div>
  );
}

export function SettingsPage() {
  const { data, isLoading } = usePreferences();

  if (isLoading) {
    return <FullScreenLoader />;
  }
  if (!data) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <FadeIn className="mx-auto max-w-2xl rounded-3xl border border-white/60 bg-white/70 px-6 py-10 shadow-card backdrop-blur-xl sm:px-10">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
          <p className="mt-1 text-sm text-slate-500">Update your preferences anytime.</p>
        </div>
        <SettingsForm initial={data} />
      </FadeIn>
    </div>
  );
}

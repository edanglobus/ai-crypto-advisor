import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import type { InvestorType } from '../../../api/preference.api';
import type { ContentType } from '../../../api/feedback.api';
import { useSavePreferences } from '../../../hooks/usePreferences';
import { getApiErrorMessage } from '../../../api/errors';
import { Button } from '../../ui/Button';
import { Alert } from '../../ui/Alert';
import { Stepper } from '../../ui/Stepper';
import { StepAssets } from './StepAssets';
import { StepInvestorType } from './StepInvestorType';
import { StepContent } from './StepContent';

const STEPS = ['Assets', 'Profile', 'Content'];

const STEP_COPY = [
  { title: 'Which assets interest you?', subtitle: 'Select the crypto you want to follow.' },
  { title: 'What kind of investor are you?', subtitle: 'This tailors your insights.' },
  { title: 'What content do you want?', subtitle: 'Pick the sections you care about most.' },
];

export function OnboardingWizard() {
  const navigate = useNavigate();
  const savePreferences = useSavePreferences();

  const [step, setStep] = useState(0);
  const [favoriteCoins, setFavoriteCoins] = useState<string[]>([]);
  const [investorType, setInvestorType] = useState<InvestorType | null>(null);
  const [contentPreferences, setContentPreferences] = useState<ContentType[]>([]);

  const toggleCoin = (id: string) =>
    setFavoriteCoins((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );

  const toggleContent = (value: ContentType) =>
    setContentPreferences((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value],
    );

  const isStepValid =
    step === 0
      ? favoriteCoins.length > 0
      : step === 1
        ? investorType !== null
        : contentPreferences.length > 0;

  const isLastStep = step === STEPS.length - 1;

  const handleNext = () => {
    if (!isStepValid) return;
    if (!isLastStep) {
      setStep((s) => s + 1);
      return;
    }
    if (!investorType) return;
    savePreferences.mutate(
      { favoriteCoins, investorType, contentPreferences },
      { onSuccess: () => navigate('/', { replace: true }) },
    );
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  const copy = STEP_COPY[step] ?? STEP_COPY[0]!;

  const renderStep = () => {
    switch (step) {
      case 0:
        return <StepAssets selected={favoriteCoins} onToggle={toggleCoin} />;
      case 1:
        return <StepInvestorType value={investorType} onChange={setInvestorType} />;
      default:
        return <StepContent selected={contentPreferences} onToggle={toggleContent} />;
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          <span className="text-brand">AI</span> Crypto Advisor
        </h1>
        <p className="mt-1 text-sm text-slate-500">Let&apos;s personalize your dashboard</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <Stepper steps={STEPS} current={step} />

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900">{copy.title}</h2>
          <p className="mt-1 text-sm text-slate-500">{copy.subtitle}</p>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mt-5"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {savePreferences.isError && (
            <div className="mt-4">
              <Alert message={getApiErrorMessage(savePreferences.error)} />
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 0 || savePreferences.isPending}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isStepValid}
            isLoading={savePreferences.isPending}
          >
            {isLastStep ? 'Finish' : 'Continue'}
            {!isLastStep && <ArrowRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

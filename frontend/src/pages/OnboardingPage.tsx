import { OnboardingWizard } from '../components/shared/onboarding/OnboardingWizard';

export function OnboardingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f7] px-4 py-10">
      <div className="w-full max-w-xl">
        <OnboardingWizard />
      </div>
    </div>
  );
}

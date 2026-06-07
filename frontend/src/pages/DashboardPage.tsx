import { usePreferences } from '../hooks/usePreferences';
import { FadeIn } from '../components/ui/FadeIn';
import { FullScreenLoader } from '../components/ui/FullScreenLoader';
import { NewsletterMasthead } from '../components/shared/dashboard/NewsletterMasthead';
import { MarketSection } from '../components/shared/dashboard/MarketSection';
import { PricesSection } from '../components/shared/dashboard/PricesSection';
import { NewsSection } from '../components/shared/dashboard/NewsSection';
import { InsightSection } from '../components/shared/dashboard/InsightSection';
import { MemeSection } from '../components/shared/dashboard/MemeSection';

export function DashboardPage() {
  const { data: prefs, isLoading } = usePreferences();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  // Show only the sections the user picked during onboarding (fixed order).
  const sections = new Set(prefs?.contentPreferences ?? []);

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <FadeIn className="mx-auto min-h-screen w-full max-w-5xl bg-white px-6 py-12 shadow-card sm:px-16 lg:px-20">
        <NewsletterMasthead />
        {/* Market Overview and Coin Prices always show. */}
        <MarketSection />
        <PricesSection />
        {sections.has('NEWS') && <NewsSection />}
        {sections.has('AI_INSIGHT') && <InsightSection />}
        {sections.has('MEME') && <MemeSection />}
      </FadeIn>
    </div>
  );
}

import { Gem, Laugh, Newspaper, Palette, Sparkles, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import type { InvestorType } from '../api/preference.api';
import type { ContentType } from '../api/feedback.api';

interface InvestorTypeOption {
  value: InvestorType;
  label: string;
  description: string;
  Icon: LucideIcon;
}

interface SectionOption {
  value: ContentType;
  label: string;
  description: string;
  Icon: LucideIcon;
}

export const INVESTOR_TYPES: InvestorTypeOption[] = [
  {
    value: 'HODLER',
    label: 'HODLer',
    description: 'Long-term believer — buy and hold through the cycles.',
    Icon: Gem,
  },
  {
    value: 'DAY_TRADER',
    label: 'Day Trader',
    description: 'Active trader chasing short-term price moves.',
    Icon: TrendingUp,
  },
  {
    value: 'NFT_COLLECTOR',
    label: 'NFT Collector',
    description: 'Into digital art, collectibles and on-chain culture.',
    Icon: Palette,
  },
];

// Optional dashboard sections. Coin Prices is always shown (driven by the
// coins picked in Q1), so it is not listed here.
export const CONTENT_OPTIONS: SectionOption[] = [
  {
    value: 'NEWS',
    label: 'Market News',
    description: 'Latest headlines moving the market.',
    Icon: Newspaper,
  },
  {
    value: 'AI_INSIGHT',
    label: 'AI Insight',
    description: 'A daily AI-generated market insight.',
    Icon: Sparkles,
  },
  {
    value: 'MEME',
    label: 'Fun Meme',
    description: 'A lighthearted crypto meme each day.',
    Icon: Laugh,
  },
];

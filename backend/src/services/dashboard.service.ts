import { UserPreference } from '@prisma/client';

import { preferenceRepository } from '../repositories/preference.repository';
import {
  fetchGlobalMarket,
  fetchMarketPrices,
  type CoinPrice,
  type MarketOverview,
} from '../integrations/coingecko.integration';
import { fetchNews, type NewsItem } from '../integrations/cryptopanic.integration';
import { fetchFearGreed, type FearGreed } from '../integrations/fearGreed.integration';
import { generateInsight } from '../integrations/openrouter.integration';
import { DEFAULT_COIN_IDS, symbolsForIds } from '../data/coins';
import { FALLBACK_NEWS } from '../data/fallbackNews';
import { MEMES, type Meme } from '../data/memes';
import { withCache } from '../utils/cache';
import { env } from '../config/env';
import { BadGatewayError } from '../errors/AppError';

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

export interface MarketSummary extends MarketOverview {
  fearGreed: FearGreed | null;
}

export interface NewsResult {
  news: NewsItem[];
  source: 'cryptopanic' | 'fallback';
}

export interface Insight {
  id: string;
  text: string;
  model: string;
  generatedAt: string;
}

export interface InsightResult {
  insight: Insight;
  source: 'ai' | 'fallback';
}

// Resolves the coin ids to use for a user (their picks, or sensible defaults).
async function resolveCoinIds(userId: string): Promise<{ ids: string[]; prefs: UserPreference | null }> {
  const prefs = await preferenceRepository.findByUserId(userId);
  const ids = prefs?.favoriteCoins.length ? prefs.favoriteCoins : DEFAULT_COIN_IDS;
  return { ids, prefs };
}

function buildInsightPrompt(prefs: UserPreference | null, coinIds: string[]): string {
  const investor = prefs?.investorType ?? 'HODLER';
  const coins = coinIds.join(', ');
  return `Audience: a ${investor.toLowerCase().replace('_', ' ')} interested in ${coins}. Write today's crypto market insight.`;
}

function buildFallbackInsight(prefs: UserPreference | null, coinIds: string[]): string {
  const focus = coinIds.slice(0, 3).join(', ');
  const investor = (prefs?.investorType ?? 'HODLER').toLowerCase().replace('_', ' ');
  return `As a ${investor}, keep an eye on ${focus}. Markets move in cycles — focus on projects with real usage, manage risk, and avoid chasing hype. Patience and diversification tend to beat timing the market.`;
}

export const dashboardService = {
  // Live coin prices for the user's selected assets (1-minute cache).
  async getPrices(userId: string, force = false): Promise<CoinPrice[]> {
    const { ids } = await resolveCoinIds(userId);
    return withCache(
      `prices:${[...ids].sort().join(',')}`,
      MINUTE,
      async () => {
        try {
          return await fetchMarketPrices(ids);
        } catch (error) {
          console.error('CoinGecko prices failed:', error);
          throw new BadGatewayError('Failed to load coin prices');
        }
      },
      force,
    );
  },

  // Global market overview — 24h volume, BTC dominance, Fear & Greed (2-min cache).
  async getMarket(force = false): Promise<MarketSummary> {
    return withCache(
      'market:global',
      2 * MINUTE,
      async () => {
        try {
          const [overview, fearGreed] = await Promise.all([fetchGlobalMarket(), fetchFearGreed()]);
          return { ...overview, fearGreed };
        } catch (error) {
          console.error('CoinGecko global failed:', error);
          throw new BadGatewayError('Failed to load market overview');
        }
      },
      force,
    );
  },

  // News for the user's assets, with static fallback (5-minute cache).
  async getNews(userId: string, force = false): Promise<NewsResult> {
    const { ids } = await resolveCoinIds(userId);
    const symbols = symbolsForIds(ids);
    return withCache(
      `news:${[...symbols].sort().join(',')}`,
      5 * MINUTE,
      async () => {
      const live = await fetchNews(symbols);
      if (live && live.length > 0) {
        return { news: live, source: 'cryptopanic' };
      }
        const stampedAt = new Date().toISOString();
        return {
          news: FALLBACK_NEWS.map((item) => ({ ...item, publishedAt: stampedAt })),
          source: 'fallback',
        };
      },
      force,
    );
  },

  // AI Insight of the Day — cached per user per day, with templated fallback.
  async getInsight(userId: string, force = false): Promise<InsightResult> {
    const { ids, prefs } = await resolveCoinIds(userId);
    const day = new Date().toISOString().slice(0, 10);
    return withCache(
      `insight:${userId}:${day}`,
      6 * HOUR,
      async () => {
        const generatedAt = new Date().toISOString();
      const aiText = await generateInsight(buildInsightPrompt(prefs, ids));
      if (aiText) {
        return {
          insight: { id: `insight-${day}`, text: aiText, model: env.OPENROUTER_MODEL, generatedAt },
          source: 'ai',
        };
      }
      return {
        insight: {
          id: `insight-${day}`,
          text: buildFallbackInsight(prefs, ids),
          model: 'fallback',
          generatedAt,
        },
        source: 'fallback',
      };
      },
      force,
    );
  },

  // Random fun meme (not cached — fresh each refresh).
  getMeme(): Meme {
    const index = Math.floor(Math.random() * MEMES.length);
    return MEMES[index] ?? MEMES[0]!;
  },
};

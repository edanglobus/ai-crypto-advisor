import { apiClient } from './client';

export interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  image: string;
  price: number;
  change24h: number;
  marketCap: number;
  sparkline7d: number[];
}

export interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string;
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

export interface Meme {
  id: string;
  title: string;
  imageUrl: string;
}

export interface FearGreed {
  value: number;
  classification: string;
}

export interface MarketOverview {
  totalVolumeUsd: number;
  btcDominance: number;
  fearGreed: FearGreed | null;
}

// `refresh: true` asks the backend to bypass its cache (user-initiated refresh).
const refreshParams = (refresh?: boolean) => (refresh ? { params: { refresh: 'true' } } : undefined);

export const dashboardApi = {
  getMarket: (refresh?: boolean): Promise<MarketOverview> =>
    apiClient
      .get<{ market: MarketOverview }>('/dashboard/market', refreshParams(refresh))
      .then((res) => res.data.market),

  getPrices: (refresh?: boolean): Promise<CoinPrice[]> =>
    apiClient
      .get<{ prices: CoinPrice[] }>('/dashboard/prices', refreshParams(refresh))
      .then((res) => res.data.prices),

  getNews: (refresh?: boolean): Promise<NewsResult> =>
    apiClient.get<NewsResult>('/dashboard/news', refreshParams(refresh)).then((res) => res.data),

  getInsight: (refresh?: boolean): Promise<InsightResult> =>
    apiClient
      .get<InsightResult>('/dashboard/insight', refreshParams(refresh))
      .then((res) => res.data),

  getMeme: (): Promise<Meme> =>
    apiClient.get<{ meme: Meme }>('/dashboard/meme').then((res) => res.data.meme),
};

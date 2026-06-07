import { env } from '../config/env';
import { fetchJson } from '../utils/http';

interface CoinGeckoMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number | null;
  market_cap: number;
  sparkline_in_7d?: { price: number[] };
}

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

// Reduce the ~168 hourly points to a lighter series for a tiny chart.
function downsample(values: number[], max: number): number[] {
  if (values.length <= max) return values;
  const step = Math.ceil(values.length / max);
  return values.filter((_, index) => index % step === 0);
}

// Fetches live market data for the given CoinGecko coin ids. Throws on failure
// (no static fallback for live prices — the caller maps it to a 502).
export async function fetchMarketPrices(coinIds: string[]): Promise<CoinPrice[]> {
  if (coinIds.length === 0) return [];

  const params = new URLSearchParams({
    vs_currency: 'usd',
    ids: coinIds.join(','),
    order: 'market_cap_desc',
    price_change_percentage: '24h',
    sparkline: 'true',
  });

  const headers: Record<string, string> = {};
  if (env.COINGECKO_API_KEY) {
    headers['x-cg-demo-api-key'] = env.COINGECKO_API_KEY;
  }

  const markets = await fetchJson<CoinGeckoMarket[]>(
    `${env.COINGECKO_BASE_URL}/coins/markets?${params.toString()}`,
    { headers },
  );

  return markets.map((market) => ({
    id: market.id,
    symbol: market.symbol.toUpperCase(),
    name: market.name,
    image: market.image,
    price: market.current_price,
    change24h: market.price_change_percentage_24h ?? 0,
    marketCap: market.market_cap,
    sparkline7d: downsample(market.sparkline_in_7d?.price ?? [], 48),
  }));
}

interface CoinGeckoGlobal {
  data: {
    total_volume: Record<string, number>;
    market_cap_percentage: Record<string, number>;
  };
}

export interface MarketOverview {
  totalVolumeUsd: number;
  btcDominance: number; // % of total market cap
}

// Global market stats (24h volume + Bitcoin dominance). Throws on failure.
export async function fetchGlobalMarket(): Promise<MarketOverview> {
  const headers: Record<string, string> = {};
  if (env.COINGECKO_API_KEY) {
    headers['x-cg-demo-api-key'] = env.COINGECKO_API_KEY;
  }

  const { data } = await fetchJson<CoinGeckoGlobal>(`${env.COINGECKO_BASE_URL}/global`, {
    headers,
  });

  return {
    totalVolumeUsd: data.total_volume.usd ?? 0,
    btcDominance: data.market_cap_percentage.btc ?? 0,
  };
}

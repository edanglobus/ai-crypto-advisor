import { fetchJson } from '../utils/http';

interface FearGreedResponse {
  data: Array<{ value: string; value_classification: string }>;
}

export interface FearGreed {
  value: number;
  classification: string;
}

// Crypto Fear & Greed Index (alternative.me, free, no key). Returns null on
// failure so the market overview still renders without it.
export async function fetchFearGreed(): Promise<FearGreed | null> {
  try {
    const res = await fetchJson<FearGreedResponse>('https://api.alternative.me/fng/?limit=1');
    const entry = res.data[0];
    if (!entry) return null;
    return {
      value: Number(entry.value),
      classification: entry.value_classification,
    };
  } catch (error) {
    console.error('Fear & Greed fetch failed:', error);
    return null;
  }
}

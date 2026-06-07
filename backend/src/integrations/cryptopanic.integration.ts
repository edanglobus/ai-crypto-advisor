import { env } from '../config/env';
import { fetchJson } from '../utils/http';

interface CryptoPanicPost {
  id: number;
  title: string;
  url: string;
  published_at: string;
  source?: { title?: string };
}

interface CryptoPanicResponse {
  results: CryptoPanicPost[];
}

export interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string;
}

// Returns recent news for the given ticker symbols, or null when no API key is
// configured or the request fails — the caller then serves static fallback news.
export async function fetchNews(coinSymbols: string[]): Promise<NewsItem[] | null> {
  if (!env.CRYPTOPANIC_API_KEY) return null;

  try {
    const params = new URLSearchParams({
      auth_token: env.CRYPTOPANIC_API_KEY,
      public: 'true',
      kind: 'news',
    });
    if (coinSymbols.length > 0) {
      params.set('currencies', coinSymbols.slice(0, 10).join(','));
    }

    const data = await fetchJson<CryptoPanicResponse>(
      `https://cryptopanic.com/api/v1/posts/?${params.toString()}`,
    );

    return data.results.slice(0, 12).map((post) => ({
      id: String(post.id),
      title: post.title,
      url: post.url,
      source: post.source?.title ?? 'CryptoPanic',
      publishedAt: post.published_at,
    }));
  } catch (error) {
    console.error('CryptoPanic fetch failed:', error);
    return null;
  }
}

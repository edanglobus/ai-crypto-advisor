export interface FallbackNewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
}

// Served when CryptoPanic is unavailable or no API key is configured, so the
// News quadrant always has content. publishedAt is stamped at request time.
export const FALLBACK_NEWS: FallbackNewsItem[] = [
  {
    id: 'fallback-1',
    title: 'Bitcoin holds steady as institutional interest continues to grow',
    url: 'https://www.coindesk.com',
    source: 'CoinDesk',
  },
  {
    id: 'fallback-2',
    title: 'Ethereum network upgrades aim to lower fees and boost throughput',
    url: 'https://cointelegraph.com',
    source: 'Cointelegraph',
  },
  {
    id: 'fallback-3',
    title: 'Stablecoins remain a key gateway for new crypto users',
    url: 'https://www.theblock.co',
    source: 'The Block',
  },
  {
    id: 'fallback-4',
    title: 'Regulators worldwide work toward clearer crypto frameworks',
    url: 'https://decrypt.co',
    source: 'Decrypt',
  },
  {
    id: 'fallback-5',
    title: 'Layer-2 networks see rising activity as scaling adoption accelerates',
    url: 'https://www.coindesk.com',
    source: 'CoinDesk',
  },
];

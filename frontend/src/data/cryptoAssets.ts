export interface CryptoAsset {
  /** CoinGecko id — reused for price/news lookups in Stage 4. */
  id: string;
  name: string;
  symbol: string;
}

// Curated shortlist of popular assets for the onboarding quiz. Ids match
// CoinGecko so the same values feed the Stage 4 price integration.
export const CRYPTO_ASSETS: CryptoAsset[] = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  { id: 'solana', name: 'Solana', symbol: 'SOL' },
  { id: 'binancecoin', name: 'BNB', symbol: 'BNB' },
  { id: 'ripple', name: 'XRP', symbol: 'XRP' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
  { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' },
];

export interface CoinMeta {
  id: string; // CoinGecko id
  symbol: string;
  name: string;
}

// Backend catalog mirroring the frontend onboarding shortlist. Used to map the
// user's selected coin ids to ticker symbols (e.g. for CryptoPanic) and to
// supply sensible defaults when a user has no saved preferences yet.
export const SUPPORTED_COINS: CoinMeta[] = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
];

export const DEFAULT_COIN_IDS = ['bitcoin', 'ethereum', 'solana', 'cardano', 'dogecoin'];

const SYMBOL_BY_ID = new Map(SUPPORTED_COINS.map((coin) => [coin.id, coin.symbol]));

export function symbolsForIds(ids: string[]): string[] {
  return ids
    .map((id) => SYMBOL_BY_ID.get(id))
    .filter((symbol): symbol is string => Boolean(symbol));
}

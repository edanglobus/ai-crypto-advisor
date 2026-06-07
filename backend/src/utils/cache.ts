interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

// Minimal in-memory TTL cache. Keeps us within free-tier rate limits for the
// external APIs without pulling in a dependency. Process-local (fine for a
// single instance; swap for Redis if horizontally scaled).
const store = new Map<string, CacheEntry<unknown>>();

export function getCached<T>(key: string): T | undefined {
  const entry = store.get(key);
  if (!entry) return undefined;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return undefined;
  }
  return entry.value as T;
}

export function setCached<T>(key: string, value: T, ttlMs: number): void {
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
}

// Returns a cached value or runs the producer, caching its result.
// Pass `force` to bypass the read (e.g. a user-initiated refresh) and refresh
// the cached value.
export async function withCache<T>(
  key: string,
  ttlMs: number,
  producer: () => Promise<T>,
  force = false,
): Promise<T> {
  if (!force) {
    const cached = getCached<T>(key);
    if (cached !== undefined) return cached;
  }
  const value = await producer();
  setCached(key, value, ttlMs);
  return value;
}

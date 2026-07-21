type CacheEntry = {
  response: string;
  sources: string[];
  createdAt: number;
};

const cache = new Map<string, CacheEntry>();

const TTL = 1000 * 60 * 10; // 10 minutes

export function getCachedResponse(key: string): CacheEntry | null {
  const entry = cache.get(key);

  if (!entry) return null;

  if (Date.now() - entry.createdAt > TTL) {
    cache.delete(key);
    return null;
  }

  return entry;
}

export function setCachedResponse(
  key: string,
  response: string,
  sources: string[]
) {
  cache.set(key, {
    response,
    sources,
    createdAt: Date.now(),
  });
}

export function clearCache() {
  cache.clear();
}
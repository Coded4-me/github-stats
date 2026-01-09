// ============================================================================
// FILE: src/lib/cache/index.ts
// DEBUG VERSION
// ============================================================================

import { kv } from '@vercel/kv';

const globalForCache = global as unknown as { localCache: Map<string, any> };

if (!globalForCache.localCache) {
  globalForCache.localCache = new Map();
  console.log('⚡ [CACHE] Initialized new In-Memory Cache Map');
}

const isRedisConfigured = !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN && process.env.KV_REST_API_URL !== "";

export async function getCachedData(key: string): Promise<string | null> {
  if (isRedisConfigured) {
    try {
      const data = await kv.get<string>(key);
      console.log(data ? `✅ [REDIS] HIT: ${key}` : `❌ [REDIS] MISS: ${key}`);
      return data;
    } catch (error) {
      console.error('⚠️ [REDIS] Connection failed, falling back to fetch:', error);
      return null;
    }
  }

  const item = globalForCache.localCache.get(key);
  
  if (!item) {
    console.log(`❌ [LOCAL] MISS: ${key}`);
    return null;
  }

  if (Date.now() > item.expiry) {
    console.log(`⏰ [LOCAL] EXPIRED: ${key}`);
    globalForCache.localCache.delete(key);
    return null;
  }

  console.log(`✅ [LOCAL] HIT: ${key}`);
  return item.value;
}

export async function setCachedData(key: string, value: string, ttl: number = 1800): Promise<void> {
  if (isRedisConfigured) {
    try {
      await kv.set(key, value, { ex: ttl });
    } catch (error) {
      console.error('Redis Write Error:', error);
    }
    return;
  }

  const expiry = Date.now() + (ttl * 1000);
  globalForCache.localCache.set(key, { value, expiry });
  console.log(`💾 [LOCAL] SAVED: ${key}`);
}
import {
  RedisClient,
  CacheObject,
  CacheContext,
  RedisInternalCacheControllerType
} from "./types"
import {getNowDateTime, hasStaleIfErrorCacheExpired, isCacheStale } from "./helpers"
import { DEFAULT_CACHE_HEADERS } from "./config"
import {
  CACHE_AGE_HEADER_KEY,
  CACHE_DYNAMIC,
  CACHE_HIT,
  CACHE_INACTIVE,
  CACHE_LAST_SAVE_HEADER_KEY,
  CACHE_MISS,
  CACHE_STALE_IF_ERROR_AGE_HEADER_KEY,
} from "./const"

export const RedisInternalCacheController = (
  ctx: CacheContext,
  redis: RedisClient
): RedisInternalCacheControllerType => {

  return {
    fetch: async (): Promise<CacheObject> => {
      if (ctx.config.disabled) {
        return {
          status: CACHE_INACTIVE,
          headers: DEFAULT_CACHE_HEADERS
        }
      }

      if (ctx.flags.skip_cache) {
        return {
          status: CACHE_MISS,
          headers: DEFAULT_CACHE_HEADERS
        }
      }

      const fetchedCache = await redis.get(ctx.cacheKey)

      if (!fetchedCache) {
        return {
          status: CACHE_DYNAMIC,
          headers: DEFAULT_CACHE_HEADERS
        }
      }

      const parsedCached = JSON.parse(fetchedCache)
      const cacheAge = ctx.settings?.sMaxage || 0

      if (isCacheStale(parsedCached, cacheAge)) {
        return {
          status: CACHE_DYNAMIC,
          response: parsedCached.response || null,
          headers: parsedCached.headers || DEFAULT_CACHE_HEADERS
        }
      }

      return {
        status: CACHE_HIT,
        response: parsedCached.response,
        headers: parsedCached.headers
      }
    },

    isHit: (cache: CacheObject): boolean => {
      return !!(cache && cache.status === CACHE_HIT)
    },

    setHeaders: (res: any, cache: CacheObject): any => {
      if (!cache) return res

      res.setHeader(`${ctx.config.headerPrefix}-cache-status`, cache.status || CACHE_DYNAMIC)
      res.setHeader(`${ctx.config.headerPrefix}-cache-last-save`, cache?.headers?.[CACHE_LAST_SAVE_HEADER_KEY] || null)
      res.setHeader(`${ctx.config.headerPrefix}-cache-age`, cache?.headers?.[CACHE_AGE_HEADER_KEY] || 0)
      res.setHeader(`${ctx.config.headerPrefix}-stale-if-error-age`, cache?.headers?.[CACHE_STALE_IF_ERROR_AGE_HEADER_KEY] || 0)

      return res
    },

    getResponse: (cache: CacheObject): object|string|number|null => {
      return cache?.response
    },

    isStaleCacheAvailable: (cache: CacheObject): boolean => {
      const staleIfErrorAge = ctx.settings?.staleIfError || 0

      if (!cache || !cache.status || !staleIfErrorAge) return false

      const isCacheValid = (
        cache.status !== CACHE_MISS
        && cache.status !== CACHE_INACTIVE
        && !hasStaleIfErrorCacheExpired(cache, staleIfErrorAge)
      )

      return isCacheValid
    },

    canSetCache: (cache: CacheObject): boolean => {
      return ctx.flags.set_cache || cache?.status === CACHE_DYNAMIC
    },

    set: async (responseToSet: any): Promise<void> => {
      if (ctx.config.disabled || !responseToSet) return

      const cacheAge = ctx.settings?.sMaxage || 0
      const staleIfErrorCacheAge = ctx.settings?.staleIfError || 0

      const newCacheObject = {
        response: responseToSet,
        headers: {
          [CACHE_LAST_SAVE_HEADER_KEY]: getNowDateTime(),
          [CACHE_AGE_HEADER_KEY]: cacheAge,
          [CACHE_STALE_IF_ERROR_AGE_HEADER_KEY]: staleIfErrorCacheAge
        }
      }

      const setCacheRes = await redis.set(ctx.cacheKey, JSON.stringify(newCacheObject))

      if (!setCacheRes || setCacheRes !== 'OK') {
        console.log(`Error setting cache ${ctx.cacheKey}`)
        throw new Error(`Error setting cache ${ctx.cacheKey}`)
      }
    },

    disconnect: async (): Promise<void> => {
      await redis.disconnect();
    }
  }
}

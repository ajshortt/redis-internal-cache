import { RedisInternalCacheController } from "./controller"
import { createContext } from "./ctx"
import { initRedisClient } from "./redis"
import { CacheSettings, ControllerConfig, ReqType, SetupOptions } from "./types"

export const RedisInternalCache = (options?: SetupOptions) => {
  const redisUrl = options && options.url ? options.url : null
  const redis = initRedisClient(redisUrl)

  // eslint-disable-next-line no-console
  console.log('HOWDY')
  return {
    init: async (
      req: ReqType,
      signiture: string,
      settings: CacheSettings,
      config?: ControllerConfig
    ) => {
      await redis.connect()
      const ctx = createContext(req, signiture, settings, config)
      return RedisInternalCacheController(ctx, redis)
    }
  }
}

// export const RedisInternalCache = async (
//   req: ReqType,
//   signiture: string,
//   settings: CacheSettings,
//   config?: ControllerConfig
// ) => {
//   const ctx = createContext(req, signiture, settings, config)
//   const redis = await initRedisClient()
//   return RedisInternalCacheController(ctx, redis)
// }

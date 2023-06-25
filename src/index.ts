import { createContext } from './ctx'
import { RedisInternalCacheController } from './controller'
import { ReqType, RedisClient, CacheSettings, ControllerConfig, RedisInternalCacheService } from './types'

export default (redis: RedisClient): RedisInternalCacheService => {
  if (!redis) throw new Error('RIC: Missing Redis Client Injection')

  return {
    init: async (req: ReqType, signiture: string, settings: CacheSettings, config?: ControllerConfig) => {
      await redis.connect()
      const ctx = createContext(req, signiture, settings, config)
      return RedisInternalCacheController(ctx, redis)
    },
  }
}

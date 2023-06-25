import { parseReq } from './parsers'
import { DEFAULT_CONFIG } from './config'
import { getFlagsFromReq, hashCacheKey } from './helpers'
import { ReqType, ReqFlags, CacheContext, CacheSettings, ControllerConfig, ControllerConfigParam } from './types'

export const createContext = (
  req: ReqType,
  signiture: string,
  settings: CacheSettings,
  config: ControllerConfigParam = {},
): CacheContext => {
  const parsedConfig: ControllerConfig = {
    ...DEFAULT_CONFIG,
    ...config,
  }

  const parsedReq = parseReq(req, parsedConfig)

  if (!parsedReq) throw Error('Cannot parse request')

  const flags: ReqFlags = getFlagsFromReq(parsedReq)

  const cacheKey: string = hashCacheKey(parsedReq, signiture)

  const ctx: CacheContext = {
    req: parsedReq,
    signiture,
    settings,
    config: parsedConfig,
    flags,
    cacheKey,
  }

  return ctx
}

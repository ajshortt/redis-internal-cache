import dayjs from 'dayjs'
import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'
import { DEFAULT_FLAG_PARAMS } from "./config"
import { CACHE_LAST_SAVE_HEADER_KEY } from "./const"
import { CacheObject, ReqFlags, Request, RequestQuery } from "./types"

export const getFlagsFromReq = (req: Request): ReqFlags => {
  const { query } = req

  if (!query) return DEFAULT_FLAG_PARAMS

  const availableFlagParamsKeys = Object.keys(DEFAULT_FLAG_PARAMS)

  let flags = {}

  for (let i = 0; i < availableFlagParamsKeys.length; i++) {
    const flagParamKey = availableFlagParamsKeys[i]
    const flagParam = query[flagParamKey as keyof RequestQuery]

    if (!flagParam) continue

    flags = {
      ...flags,
      [flagParamKey]: flagParam
    }
  }

  return {
    ...DEFAULT_FLAG_PARAMS,
    ...flags
  }
}

export const hashCacheKey = (req: Request , signiture: string): string => {
  const string = req.url ? `${signiture}:${req.url}` : signiture
  const hashDigest = sha256(string)
  const hash = Base64.stringify(hashDigest);
  return hash
}

export const isCacheStale = (cache: CacheObject, cacheAge: number): boolean => {
  const cacheTimeOfLastSave = cache?.headers?.[CACHE_LAST_SAVE_HEADER_KEY]

  if (!cacheAge || !cacheTimeOfLastSave) return true

  return hasCacheExpired(cacheTimeOfLastSave, cacheAge)
}

export const hasCacheExpired = (timeOfSave: string, cacheAge: number): boolean => {
  const validUntil = dayjs(timeOfSave).add(cacheAge, 'seconds')
  const now = dayjs()
  return now.isAfter(validUntil)
}

export const hasStaleIfErrorCacheExpired = (cache: CacheObject, staleIfErrorCacheAge: number): boolean => {
  const cacheTimeOfLastSave = cache?.headers?.[CACHE_LAST_SAVE_HEADER_KEY]

  if (!staleIfErrorCacheAge || !cacheTimeOfLastSave) return true

  return hasCacheExpired(cacheTimeOfLastSave, staleIfErrorCacheAge)
}

export const getNowDateTime = () => dayjs()

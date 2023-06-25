import {
  SET_CACHE_PARAM_KEY,
  SKIP_CACHE_PARAM_KEY,
  CACHE_AGE_HEADER_KEY,
  CACHE_LAST_SAVE_HEADER_KEY,
  CACHE_STALE_IF_ERROR_AGE_HEADER_KEY,
} from './const'

export interface RedisInternalCacheService {
  init(
    req: ReqType,
    signiture: string,
    settings: CacheSettings,
    config?: ControllerConfig,
  ): Promise<RedisInternalCacheControllerType>
}

export interface RedisInternalCacheControllerType {
  fetch(): Promise<CacheObject>
  isHit(cache: CacheObject): boolean
  setHeaders(res: any, cache: CacheObject): any
  getResponse(cache: CacheObject): object | string | number | null
  isStaleCacheAvailable(cache: CacheObject): boolean
  canSetCache(cache: CacheObject): boolean
  set(responseToSet: any): Promise<void>
  disconnect(): Promise<void>
}

export interface SetupOptions {
  url: string | null
}

export interface RequestQuery {
  [key: string]: any
}

export interface Request {
  url: string
  query?: RequestQuery
}

export interface VercelRequest {
  url: string
  query?: RequestQuery
}

export interface ExpressRequest {
  hostname: string
  originalUrl: string
  query?: RequestQuery
}

export type ReqType = VercelRequest & ExpressRequest

export interface ControllerConfig {
  disabled?: boolean
  reqResVendor?: string
  headerPrefix: string
}

export type ControllerConfigParam = ControllerConfig | object

export interface CacheSettings {
  sMaxage?: number
  maxAge?: number
  staleWhileRevalidate?: number
  staleIfError?: number
}

export interface CacheHeaders {
  [CACHE_LAST_SAVE_HEADER_KEY]: string | null
  [CACHE_AGE_HEADER_KEY]: number
  [CACHE_STALE_IF_ERROR_AGE_HEADER_KEY]: number
}

export interface CacheObject {
  status: string
  headers: CacheHeaders
  response?: any
}

export interface ReqFlags {
  [SKIP_CACHE_PARAM_KEY]: boolean
  [SET_CACHE_PARAM_KEY]: boolean
}

export interface CacheContext {
  req: Request
  signiture: string
  settings: CacheSettings
  config: ControllerConfig
  flags: ReqFlags
  cacheKey: string
}

export interface RedisClient {
  connect(): Promise<void>
  get(cacheKey: string): any
  set(cacheKey: string, jsonStringToStore: string): Promise<string>
  disconnect(): Promise<void>
}

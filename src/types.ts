import { CACHE_AGE_HEADER_KEY, CACHE_LAST_SAVE_HEADER_KEY, CACHE_STALE_IF_ERROR_AGE_HEADER_KEY, SET_CACHE_PARAM_KEY, SKIP_CACHE_PARAM_KEY } from "./const";

export interface SetupOptions {
  url: string | null
}

export interface RequestQuery {
  [key: string]: any
}

export interface Request {
  url: string,
  query?: RequestQuery
}

export interface VercelRequest {
  url: string,
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
  reqType?: string
  headerPrefix: string
}

export type ControllerConfigParam = ControllerConfig | object

export interface CacheSettings {
  sMaxage?: number,
  maxAge?: number,
  staleWhileRevalidate?: number,
  staleIfError?: number,
}

export interface CacheHeaders {
  [CACHE_LAST_SAVE_HEADER_KEY]: string | null,
  [CACHE_AGE_HEADER_KEY]: number,
  [CACHE_STALE_IF_ERROR_AGE_HEADER_KEY]: number,
}

export interface CacheObject {
  status: string,
  headers: CacheHeaders,
  response?: any,
}

export interface ReqFlags {
  [SKIP_CACHE_PARAM_KEY]: boolean,
  [SET_CACHE_PARAM_KEY]: boolean,
}

export interface CacheContext {
  req: Request,
  signiture: string,
  settings: CacheSettings,
  config: ControllerConfig,
  flags: ReqFlags,
  cacheKey: string,
}

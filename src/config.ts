import {
  REQ_RES_EXPRESS,
  SET_CACHE_PARAM_KEY,
  SKIP_CACHE_PARAM_KEY,
  CACHE_AGE_HEADER_KEY,
  CACHE_LAST_SAVE_HEADER_KEY,
  CACHE_STALE_IF_ERROR_AGE_HEADER_KEY,
} from './const'
import { ReqFlags, CacheHeaders, ControllerConfig } from './types'

export const DEFAULT_CONFIG: ControllerConfig = {
  disabled: false,
  headerPrefix: 'ric',
  reqResVendor: REQ_RES_EXPRESS,
}

export const DEFAULT_FLAG_PARAMS: ReqFlags = {
  [SKIP_CACHE_PARAM_KEY]: false,
  [SET_CACHE_PARAM_KEY]: true,
}

export const DEFAULT_CACHE_HEADERS: CacheHeaders = {
  [CACHE_LAST_SAVE_HEADER_KEY]: null,
  [CACHE_AGE_HEADER_KEY]: 0,
  [CACHE_STALE_IF_ERROR_AGE_HEADER_KEY]: 0,
}

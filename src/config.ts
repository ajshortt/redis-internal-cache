import { CacheHeaders, ControllerConfig, ReqFlags } from "./types";

import {
  CACHE_AGE_HEADER_KEY,
  CACHE_LAST_SAVE_HEADER_KEY,
  CACHE_STALE_IF_ERROR_AGE_HEADER_KEY,
  SET_CACHE_PARAM_KEY,
  SKIP_CACHE_PARAM_KEY
} from "./const";

export const DEFAULT_CONFIG: ControllerConfig = {
  disabled: false,
  headerPrefix: 'ric',
  reqType: 'express'
}

export const DEFAULT_FLAG_PARAMS: ReqFlags = {
  [SKIP_CACHE_PARAM_KEY]: false,
  [SET_CACHE_PARAM_KEY]: true,
}

export const DEFAULT_CACHE_HEADERS: CacheHeaders = {
  [CACHE_LAST_SAVE_HEADER_KEY]: null,
  [CACHE_AGE_HEADER_KEY]: 0,
  [CACHE_STALE_IF_ERROR_AGE_HEADER_KEY]: 0
}

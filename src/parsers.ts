import { REQ_RES_EXPRESS, REQ_RES_VERCEL } from './const'
import { ControllerConfig, ReqType, Request } from './types'

const parseVercelReq = (req: ReqType): Request => {
  return {
    ...req,
    url: req.url,
    query: req.query,
  }
}

const parseExpressReq = (req: ReqType): Request => {
  return {
    ...req,
    url: `${req.hostname}${req.originalUrl}`,
    query: req.query,
  }
}

export const parseReq = (req: ReqType, config: ControllerConfig): Request | null => {
  const { reqResVendor } = config

  if (reqResVendor === REQ_RES_VERCEL) return parseVercelReq(req)
  if (reqResVendor === REQ_RES_EXPRESS) return parseExpressReq(req)

  return null
}

import { ControllerConfig, ReqType, Request } from "./types"

const parseVercelReq = (req: ReqType): Request => {
  return {
    ...req,
    url: req.url,
    query: req.query
  }
}

const parseExpressReq = (req: ReqType): Request => {
  return {
    ...req,
    url: `${req.hostname}${req.originalUrl}`,
    query: req.query
  }
}

export const parseReq = (req: ReqType, config: ControllerConfig): Request | null => {
  const { reqType } = config

  if (reqType === 'vercel') return parseVercelReq(req)
  if (reqType === 'express') return parseExpressReq(req)

  return null
}

import { Request, Response, NextFunction } from 'express';

import { LogUtils } from '../utils/logUtils';

export interface RequestWithStartTime extends Request {
  startTime?: number;
}

/**
 * 请求日志中间件
 */
export const requestLoggerMiddleware = (req: RequestWithStartTime, res: Response, next: NextFunction) => {
  // 记录请求开始时间
  req.startTime = Date.now();

  // 获取客户端IP
  const clientIP = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] as string || 'unknown';

  // 记录请求开始
  LogUtils.requestStart(req.method, req.originalUrl, clientIP);

  // 监听响应结束事件
  res.on('finish', () => {
    const duration = Date.now() - (req.startTime || Date.now());
    LogUtils.requestEnd(req.method, req.originalUrl, res.statusCode, duration);

    // 记录性能指标
    if (duration > 1000) {
      LogUtils.performance(`Slow request: ${req.method} ${req.originalUrl}`, duration);
    }
  });

  next();
};

/**
 * 错误日志中间件
 */
export const errorLoggerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  LogUtils.error(`Request error for ${req.method} ${req.originalUrl}`, err);

  // 记录请求详细信息
  LogUtils.error('Request details', {
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    body: req.body,
    query: req.query,
    params: req.params,
    ip: req.ip || req.connection.remoteAddress
  });

  next(err);
};

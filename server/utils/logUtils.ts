import { logger, errorLogger } from '../logger';

export class LogUtils {
  /**
   * 记录信息日志
   */
  static info(message: string, ...args: any[]) {
    logger.info(message, ...args);
  }

  /**
   * 记录警告日志
   */
  static warn(message: string, ...args: any[]) {
    logger.warn(message, ...args);
  }

  /**
   * 记录错误日志
   */
  static error(message: string, error?: Error | any, ...args: any[]) {
    if (error instanceof Error) {
      errorLogger.error(`${message}: ${error.message}`, error.stack, ...args);
    } else {
      errorLogger.error(message, error, ...args);
    }
  }

  /**
   * 记录调试日志
   */
  static debug(message: string, ...args: any[]) {
    logger.debug(message, ...args);
  }

  /**
   * 记录请求开始
   */
  static requestStart(method: string, url: string, ip?: string) {
    logger.info(`[REQUEST START] ${method} ${url}${ip ? ` from ${ip}` : ''}`);
  }

  /**
   * 记录请求结束
   */
  static requestEnd(method: string, url: string, statusCode: number, duration: number) {
    logger.info(`[REQUEST END] ${method} ${url} - ${statusCode} (${duration}ms)`);
  }

  /**
   * 记录数据库操作
   */
  static database(operation: string, table?: string, duration?: number) {
    const message = `[DATABASE] ${operation}${table ? ` on ${table}` : ''}${duration ? ` (${duration}ms)` : ''}`;
    logger.info(message);
  }

  /**
   * 记录性能指标
   */
  static performance(metric: string, value: number, unit: string = 'ms') {
    logger.info(`[PERFORMANCE] ${metric}: ${value}${unit}`);
  }

  /**
   * 记录用户操作
   */
  static userAction(userId: string | number, action: string, details?: any) {
    const message = `[USER ACTION] User ${userId}: ${action}`;
    if (details) {
      logger.info(message, details);
    } else {
      logger.info(message);
    }
  }
}

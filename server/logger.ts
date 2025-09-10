import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import log4js from 'log4js';

import { getLogConfig } from './config/logConfig';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const logConfig = getLogConfig();

// 动态构建appenders配置
const appenders: any = {};
const defaultAppenders: string[] = [];
const errorAppenders: string[] = [];

// 控制台输出
if (logConfig.enableConsole) {
  appenders.console = {
    type: 'console',
    layout: {
      type: 'pattern',
      pattern: '%d{yyyy-MM-dd hh:mm:ss} [%p] %c - %m'
    }
  };
  defaultAppenders.push('console');
  errorAppenders.push('console');
}

// 文件输出
if (logConfig.enableFile) {
  // 应用日志文件
  appenders.app = {
    type: 'file',
    filename: path.resolve(__dirname, `../${logConfig.logDirectory}/app.log`),
    maxLogSize: logConfig.maxFileSize,
    backups: logConfig.maxBackups,
    layout: {
      type: 'pattern',
      pattern: '%d{yyyy-MM-dd hh:mm:ss} [%p] %c - %m'
    }
  };
  defaultAppenders.push('app');

  // 错误日志文件
  appenders.error = {
    type: 'file',
    filename: path.resolve(__dirname, `../${logConfig.logDirectory}/error.log`),
    maxLogSize: logConfig.maxFileSize,
    backups: logConfig.maxBackups,
    layout: {
      type: 'pattern',
      pattern: '%d{yyyy-MM-dd hh:mm:ss} [%p] %c - %m'
    }
  };
  errorAppenders.push('error');

  // 访问日志文件
  appenders.access = {
    type: 'dateFile',
    filename: path.resolve(__dirname, `../${logConfig.logDirectory}/access.log`),
    pattern: '.yyyy-MM-dd',
    layout: {
      type: 'pattern',
      pattern: '%d{yyyy-MM-dd hh:mm:ss} - %m'
    }
  };
}

// 配置log4js
log4js.configure({
  appenders,
  categories: {
    default: {
      appenders: defaultAppenders.length > 0 ? defaultAppenders : ['console'],
      level: logConfig.level
    },
    error: {
      appenders: errorAppenders.length > 0 ? errorAppenders : ['console'],
      level: 'error'
    },
    access: {
      appenders: logConfig.enableFile ? ['access'] : ['console'],
      level: 'info'
    }
  }
});

// 创建不同类型的logger
export const logger = log4js.getLogger('default');
export const errorLogger = log4js.getLogger('error');
export const accessLogger = log4js.getLogger('access');

// 导出log4js实例，用于Express中间件
export default log4js;

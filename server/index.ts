// 忽略 CSS 导入，避免服务端渲染时出错
import 'ignore-styles';

import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import express, { Request, Response, NextFunction } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import App from '../src/shared/App';

import log4js, { logger, errorLogger, accessLogger } from './logger';
import { requestLoggerMiddleware, errorLoggerMiddleware } from './middleware/requestLogger';
import { LogUtils } from './utils/logUtils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 启用信任代理，用于获取真实IP
app.set('trust proxy', true);

// 添加请求解析中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 添加自定义请求日志中间件
app.use(requestLoggerMiddleware);

// 添加访问日志中间件
app.use(log4js.connectLogger(accessLogger, {
  level: 'info',
  format: ':remote-addr - :method :url :status :response-time ms - :res[content-length]'
}));

// 静态文件服务
app.use(express.static(path.resolve(__dirname, '../dist/public')));

// 添加错误日志中间件
app.use(errorLoggerMiddleware);

// 全局错误处理中间件
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  LogUtils.error('Unhandled error occurred', err);
  res.status(500).send('Internal Server Error');
});

// SSR路由处理
app.get('*', (req: Request, res: Response) => {
  const startTime = Date.now();

  try {
    LogUtils.info(`Processing SSR request for: ${req.url}`);

    // 渲染React应用
    const renderStartTime = Date.now();
    const appString = renderToString(
      React.createElement(StaticRouter, { location: req.url },
        React.createElement(App)
      )
    );
    const renderDuration = Date.now() - renderStartTime;
    LogUtils.performance(`React SSR render for ${req.url}`, renderDuration);

    // 读取HTML模板
    const indexFile = path.resolve(__dirname, '../dist/public/index.html');

    fs.readFile(indexFile, 'utf8', (err, data) => {
      if (err) {
        LogUtils.error('Failed to read HTML template', err);
        return res.status(500).send('Oops, better luck next time!');
      }

      // 将渲染的React应用注入到HTML中
      const html = data.replace(
        '<div id="root"></div>',
        `<div id="root">${appString}</div>`
      );

      const totalDuration = Date.now() - startTime;
      LogUtils.info(`Successfully rendered SSR for: ${req.url}`);
      LogUtils.performance(`Total SSR processing for ${req.url}`, totalDuration);

      return res.send(html);
    });
  } catch (error) {
    LogUtils.error(`SSR rendering error for ${req.url}`, error);
    res.status(500).send('Server rendering error');
  }
});

app.listen(PORT, () => {
  LogUtils.info(`Server is running on http://localhost:${PORT}`);
  LogUtils.info('Log files will be created in the logs directory');
  LogUtils.info('Available log files:');
  LogUtils.info('  - logs/app.log (Application logs)');
  LogUtils.info('  - logs/error.log (Error logs)');
  LogUtils.info('  - logs/access.log (Access logs)');
});

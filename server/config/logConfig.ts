export interface LogConfig {
  level: string;
  enableConsole: boolean;
  enableFile: boolean;
  maxFileSize: number;
  maxBackups: number;
  logDirectory: string;
}

export const getLogConfig = (): LogConfig => {
  const env = process.env.NODE_ENV || 'development';

  const baseConfig: LogConfig = {
    level: 'info',
    enableConsole: true,
    enableFile: true,
    maxFileSize: 10485760, // 10MB
    maxBackups: 5,
    logDirectory: 'logs'
  };

  switch (env) {
    case 'development':
      return {
        ...baseConfig,
        level: 'debug',
        enableConsole: true,
        enableFile: true
      };

    case 'production':
      return {
        ...baseConfig,
        level: 'info',
        enableConsole: false,
        enableFile: true,
        maxFileSize: 52428800, // 50MB
        maxBackups: 10
      };

    case 'test':
      return {
        ...baseConfig,
        level: 'error',
        enableConsole: false,
        enableFile: false
      };

    default:
      return baseConfig;
  }
};

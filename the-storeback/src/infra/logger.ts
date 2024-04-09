import pino from 'pino';

import { LoggerOptions } from 'pino';

const env = process.env.NODE_ENV || 'production';

export const loggingConfig: LoggerOptions = {
  level: env === 'production' ? 'info' : 'debug',
  base: { module: 'the-storeback' }
};


export const logger = pino(loggingConfig);

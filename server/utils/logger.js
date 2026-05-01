import winston from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';

const loggingWinston = new LoggingWinston();

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'relix-api' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    // Task 13: Add Google Cloud Logging transport
    loggingWinston
  ]
});

export default logger;

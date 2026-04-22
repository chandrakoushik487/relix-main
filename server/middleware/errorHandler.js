import logger from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error(`${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  if (process.env.NODE_ENV !== 'production') {
     logger.error(err.stack);
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || 'SERVER_ERROR',
      message: err.message || 'Internal Server Error',
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    }
  });
};

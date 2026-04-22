import mongoose from 'mongoose';
import logger from '../utils/logger.js';

const connectDB = async (retryCount = 5) => {
  if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('<user>:<password>')) {
    logger.warn('MongoDB URI is not configured correctly. Skipping DB connection.');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    
    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected! Attempting to reconnect...');
    });
    
    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected!');
    });

  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    if (retryCount > 0) {
      logger.info(`Retrying MongoDB connection... (${retryCount} attempts left)`);
      setTimeout(() => connectDB(retryCount - 1), 5000);
    } else {
      logger.error('Failed to connect to MongoDB after multiple attempts. Exiting process.');
      process.exit(1);
    }
  }
};

export default connectDB;

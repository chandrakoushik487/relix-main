import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import winston from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resolveCredentialPath = (credentialPath) => {
  if (!credentialPath) return null;
  const absolutePath = path.isAbsolute(credentialPath)
    ? credentialPath
    : path.resolve(__dirname, '..', credentialPath);
  return fs.existsSync(absolutePath) ? absolutePath : null;
};

const googleCredentialPath = resolveCredentialPath(process.env.GOOGLE_APPLICATION_CREDENTIALS)
  || resolveCredentialPath(process.env.FIREBASE_CREDENTIALS_PATH);

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  })
];

if (googleCredentialPath || process.env.FIREBASE_CREDENTIALS_JSON) {
  try {
    transports.push(new LoggingWinston());
  } catch (error) {
    console.warn('Google Cloud Logging disabled because credentials are not available:', error.message);
  }
}

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'relix-api' },
  transports
});

export default logger;

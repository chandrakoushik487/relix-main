import admin from 'firebase-admin';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../utils/logger.js';

// Fix #20: Use absolute path so this config works regardless of cwd
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serverEnvPath = path.resolve(__dirname, '../.env');
const rootEnvPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: fs.existsSync(serverEnvPath) ? serverEnvPath : rootEnvPath });

const resolveAbsolutePath = (relativePath) => {
    if (!relativePath) return null;
    const absolutePath = path.isAbsolute(relativePath)
        ? relativePath
        : path.resolve(__dirname, relativePath);
    return fs.existsSync(absolutePath) ? absolutePath : null;
};

const loadServiceAccount = (filePath) => {
    try {
        const raw = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(raw);
    } catch (error) {
        logger.error(`Unable to parse Firebase service account file at ${filePath}: ${error.message}`);
        return null;
    }
};

const initializeFirebase = () => {
    try {
        if (!admin.apps.length) {
            const serviceAccountPath = resolveAbsolutePath(process.env.FIREBASE_CREDENTIALS_PATH);
            const serviceAccountJson = process.env.FIREBASE_CREDENTIALS_JSON;

            if (serviceAccountPath) {
                const serviceAccount = loadServiceAccount(serviceAccountPath);
                if (serviceAccount) {
                    admin.initializeApp({
                        credential: admin.credential.cert(serviceAccount)
                    });
                    logger.info('Firebase Admin initialized using FIREBASE_CREDENTIALS_PATH.');
                    return;
                }
            }

            if (serviceAccountJson) {
                try {
                    const serviceAccount = JSON.parse(serviceAccountJson);
                    admin.initializeApp({
                        credential: admin.credential.cert(serviceAccount)
                    });
                    logger.info('Firebase Admin initialized using FIREBASE_CREDENTIALS_JSON.');
                    return;
                } catch (error) {
                    logger.error(`Invalid FIREBASE_CREDENTIALS_JSON payload: ${error.message}`);
                }
            }

            if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
                const adcPath = resolveAbsolutePath(process.env.GOOGLE_APPLICATION_CREDENTIALS);
                if (adcPath) {
                    process.env.GOOGLE_APPLICATION_CREDENTIALS = adcPath;
                    admin.initializeApp({
                        credential: admin.credential.applicationDefault()
                    });
                    logger.info('Firebase Admin initialized with Application Default Credentials.');
                    return;
                }
                logger.warn(`GOOGLE_APPLICATION_CREDENTIALS path not found: ${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);
            }

            if (process.env.FIREBASE_PROJECT_ID) {
                admin.initializeApp({
                    projectId: process.env.FIREBASE_PROJECT_ID
                });
                logger.warn('Firebase Admin initialized with only Project ID. Firestore may not have full access.');
                return;
            }

            logger.error('Missing Firebase credentials. Please set GOOGLE_APPLICATION_CREDENTIALS, FIREBASE_CREDENTIALS_PATH, or FIREBASE_CREDENTIALS_JSON in .env.');
        }
    } catch (error) {
        logger.error(`Error initializing Firebase Admin: ${error.message}`);
    }
};

initializeFirebase();

const db = admin.apps.length ? admin.firestore() : null;

export { admin, db };

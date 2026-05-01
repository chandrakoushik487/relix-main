import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../utils/logger.js';

// Fix #20: Use absolute path so this config works regardless of cwd
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Initialize from GOOGLE_APPLICATION_CREDENTIALS environment variable
// Or initialize with explicit service account JSON
const initializeFirebase = () => {
    try {
        if (!admin.apps.length) {
            // Attempt to initialize using application default credentials.
            // If running locally, you must set the GOOGLE_APPLICATION_CREDENTIALS env var
            // pointing to your downloaded service account JSON file.
            if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
                admin.initializeApp({
                    credential: admin.credential.applicationDefault()
                });
                logger.info('Firebase Admin initialized with Application Default Credentials.');
            } else if (process.env.FIREBASE_PROJECT_ID) {
               // Fallback / Mock initialization for development if no credentials are provided yet
                admin.initializeApp({
                    projectId: process.env.FIREBASE_PROJECT_ID
                });
                logger.warn('Firebase Admin initialized with only Project ID. Firestore may not have full access.');
            } else {
                logger.error('Missing Firebase credentials. Please set GOOGLE_APPLICATION_CREDENTIALS in .env.');
            }
        }
    } catch (error) {
        logger.error(`Error initializing Firebase Admin: ${error.message}`);
    }
};

initializeFirebase();

const db = admin.apps.length ? admin.firestore() : null;

export { admin, db };

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
            // Initialize using application default credentials.
            // On Cloud Run, this uses the service's default service account.
            // Locally, set GOOGLE_APPLICATION_CREDENTIALS or provide projectId.
            if (process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.K_SERVICE) {
                admin.initializeApp({
                    credential: admin.credential.applicationDefault()
                });
                logger.info('Firebase Admin initialized with Application Default Credentials.');
            } else if (process.env.FIREBASE_PROJECT_ID) {
                admin.initializeApp({
                    projectId: process.env.FIREBASE_PROJECT_ID
                });
                logger.warn('Firebase Admin initialized with Project ID.');
            } else {
                // Default to standard initialization which works if gcloud is initialized
                admin.initializeApp();
                logger.info('Firebase Admin initialized with default settings.');
            }
        }
    } catch (error) {
        logger.error(`Error initializing Firebase Admin: ${error.message}`);
    }
};

initializeFirebase();

const db = admin.apps.length ? admin.firestore() : null;

export { admin, db };

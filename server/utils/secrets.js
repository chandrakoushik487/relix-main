/**
 * Utility for loading secrets from Google Secret Manager.
 *
 * The module provides two async helpers:
 *   - `getSecret(secretName)` – fetches a single secret value.
 *   - `loadSecretsIntoEnv(secretsList)` – loads an array of secret names into
 *     `process.env` and logs each successful load.
 *
 * It also caches secret values in‑memory to avoid repeated API calls during a
 * single process lifetime.
 */

import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import logger from './logger.js';

const client = new SecretManagerServiceClient();
/** In‑memory cache: secretName → value */
const secretCache = new Map();

/**
 * Retrieve the latest version of a secret from Secret Manager.
 *
 * @param {string} secretName - Name of the secret (without project prefix).
 * @returns {Promise<string|null>} The secret payload as a string, or `null` on error.
 * @throws Will throw if `GOOGLE_PROJECT_ID` is not set.
 */
export const getSecret = async (secretName) => {
  // Fast‑path: return cached value if we already fetched it.
  if (secretCache.has(secretName)) {
    return secretCache.get(secretName);
  }

  const project = process.env.GOOGLE_PROJECT_ID;
  if (!project) {
    const err = new Error('GOOGLE_PROJECT_ID environment variable is required to access secrets');
    logger.error(err.message);
    throw err;
  }
  const name = `projects/${project}/secrets/${secretName}/versions/latest`;

  try {
    const [version] = await client.accessSecretVersion({ name });
    const value = version.payload.data.toString();
    // Cache for subsequent calls.
    secretCache.set(secretName, value);
    return value;
  } catch (error) {
    logger.error(`Error accessing secret ${secretName}:`, error);
    return null;
  }
};

/**
 * Load a list of secrets into the process environment.
 *
 * @param {string[]} secretsList - Array of secret names to load.
 */
export const loadSecretsIntoEnv = async (secretsList) => {
  for (const secret of secretsList) {
    const value = await getSecret(secret);
    if (value) {
      process.env[secret] = value;
      logger.info(`Loaded secret ${secret} into environment.`);
    }
  }
};

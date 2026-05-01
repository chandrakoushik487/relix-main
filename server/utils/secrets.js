import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import logger from './logger.js';

const client = new SecretManagerServiceClient();

export const getSecret = async (secretName) => {
  const project = process.env.GOOGLE_PROJECT_ID;
  const name = `projects/${project}/secrets/${secretName}/versions/latest`;

  try {
    const [version] = await client.accessSecretVersion({ name });
    return version.payload.data.toString();
  } catch (error) {
    logger.error(`Error accessing secret ${secretName}:`, error);
    return null;
  }
};

export const loadSecretsIntoEnv = async (secretsList) => {
  for (const secret of secretsList) {
    const value = await getSecret(secret);
    if (value) {
      process.env[secret] = value;
      logger.info(`Loaded secret ${secret} into environment.`);
    }
  }
};

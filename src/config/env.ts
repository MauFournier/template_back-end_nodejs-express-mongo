import dotenv from 'dotenv';
import {SecretManagerServiceClient} from '@google-cloud/secret-manager';

// Load environment variables from the .env file
dotenv.config();

const env = process.env.NODE_ENV || 'development';

interface Config {
  PORT: string | number;
  MONGODB_URI_LOCAL?: string;
  MONGODB_URI_ATLAS?: string;
}

const configs: Record<string, Config> = {
  base: {
    PORT: process.env.PORT || 3000,
  },
  development: {
    PORT: process.env.PORT || 3000,
  },
  production: {
    PORT: process.env.PORT || 3000,
  },
};

async function getSecret(secretName: string): Promise<string | undefined> {
  if (process.env.NODE_ENV !== 'production') {
    return undefined;
  }

  const client = new SecretManagerServiceClient();
  const projectId = 'taskfitter-back-end';
  const secretVersion = `projects/${projectId}/secrets/${secretName}/versions/latest`;

  try {
    const [version] = await client.accessSecretVersion({name: secretVersion});
    const secretPayload = version.payload?.data?.toString();
    return secretPayload;
  } catch (error) {
    console.error(`Error loading secret ${secretName}:`, error);
    return undefined;
  }
}

async function loadConfig(): Promise<Config> {
  const localMongoDBUri =
    process.env.MONGODB_URI_LOCAL || (await getSecret('mongodb_uri_local'));
  const atlasMongoDBUri =
    process.env.MONGODB_URI_ATLAS || (await getSecret('mongodb_uri_atlas'));

  if (localMongoDBUri) {
    configs.base.MONGODB_URI_LOCAL = localMongoDBUri;
  }
  if (atlasMongoDBUri) {
    configs.base.MONGODB_URI_ATLAS = atlasMongoDBUri;
  }

  // Merge base config with environment-specific config
  const finalConfig: Config = {...configs.base, ...configs[env]};
  return finalConfig;
}

export default loadConfig;

import { Logger } from '@nestjs/common';
import { SERVICE_TOKENS, QUEUE_TOKENS } from '@revuc/contract';

const logger = new Logger('Microservice Config');

type ServiceConfig = {
  [key in keyof typeof SERVICE_TOKENS]: {
    tcp: {
      host: string;
      port: number;
    };
    database: {
      url: string;
    };
  };
};

type QueueConfig = {
  [key in keyof typeof QUEUE_TOKENS]: {
    urls: string[];
    queue: string;
  };
};

const getServiceConfig = (key: string) => {
  const tcp = {
    host: process.env[`${key}_TCP_HOST`],
    port: Number(process.env[`${key}_TCP_PORT`]),
  };
  const database = {
    url: process.env[`${key}_DATABASE_URL`],
  };

  if (!tcp.host || !tcp.port || !database.url) {
    logger.error(`Missing config for ${key}`, {
      tcp,
      database,
    });
    throw new Error(`Missing config for ${key}`);
  }

  logger.log(`Found environment variables for service ${key}`, {
    tcp,
    database,
  });

  return { tcp, database };
};

const getQueueConfig = (key: string) => {
  const config = {
    urls: process.env[`${key}_URLS`].split(',').map((url) => url.trim()),
    queue: process.env[`${key}_QUEUE`],
  };

  if (!config.urls.length || !config.queue) {
    logger.error(`Missing config for ${key}`, {
      config,
    });
    throw new Error(`Missing config for ${key}`);
  }

  logger.log(`Found environment variables for queues`, { config });

  return config;
};

const serviceConfig: ServiceConfig = Object.entries(SERVICE_TOKENS).reduce(
  (acc, [key]) => {
    acc[key] = getServiceConfig(key);
    return acc;
  },
  {} as ServiceConfig,
);

const queueConfig: QueueConfig = Object.entries(QUEUE_TOKENS).reduce(
  (acc, [key]) => {
    acc[key] = getQueueConfig(key);
    return acc;
  },
  {} as QueueConfig,
);

export const Configuration: ServiceConfig & QueueConfig = {
  ...serviceConfig,
  ...queueConfig,
};

import { Logger } from '@nestjs/common';
import { SERVICE_TOKENS } from '@revuc/contract';

type ServiceConfig = {
  [key in keyof typeof SERVICE_TOKENS]: {
    host: string;
    port: number;
    databaseUrl: string;
  };
};

const logger = new Logger('Microservice Config');

export const Configuration: ServiceConfig = Object.entries(
  SERVICE_TOKENS,
).reduce((acc, [key]) => {
  const host = process.env[`${key}_HOST`];
  const port = Number(process.env[`${key}_PORT`]);
  const databaseUrl = process.env[`${key}_DATABASE_URL`];

  if (!host || !port || !databaseUrl) {
    logger.error(`Missing environment variables for service ${key}`, {
      host,
      port,
      databaseUrl,
    });
    throw new Error(`Missing environment variables for service ${key}`);
  }

  acc[key] = {
    host,
    port,
    databaseUrl,
  };
  return acc;
}, {} as ServiceConfig);

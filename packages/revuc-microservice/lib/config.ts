import { SERVICE_TOKENS } from "@revuc/contract";

type ServiceConfig = {
  [key in keyof typeof SERVICE_TOKENS]: {
    host: string;
    port: number;
    databaseUrl: string;
  };
}

export const Configuration: ServiceConfig = Object.entries(SERVICE_TOKENS).reduce((acc, [key, value]) => {
  acc[key] = {
    host: process.env[`${key}_HOST`] || "localhost",
    port: parseInt(process.env[`${key}_PORT`] || "3000", 10),
    databaseUrl: process.env[`${key}_DATABASE_URL`] || "mongodb://localhost:27017/test",
  };
  return acc;
}, {} as ServiceConfig);
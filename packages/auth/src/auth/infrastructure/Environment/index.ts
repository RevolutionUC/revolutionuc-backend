export type ENV = `DATABASE_URL` | `production` | `PORT`;

const envKeys: { [key in ENV]: ENV } = {
  DATABASE_URL: `DATABASE_URL`,
  production: `production`,
  PORT: `PORT`,
};

export class ConfigService {
  private readonly envConfig: { [key in ENV]: string };

  private static instance: ConfigService;

  private constructor() {
    this.envConfig = Object.entries(envKeys).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: process.env[value],
      }),
      {} as { [key in ENV]: string },
    );
  }

  static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }

    return ConfigService.instance;
  }

  get(key: ENV): string {
    return this.envConfig[key];
  }
}

export const ConfigProvider = {
  provide: ConfigService,
  useValue: ConfigService.getInstance(),
};

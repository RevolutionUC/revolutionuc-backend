export type ENV =
  | `DATABASE_URL`
  | `production`
  | `PORT`
  | `SENDGRID_API_KEY`
  | `JUDGE_PASSWORD`
  | `DEVPOST_TITLE_COLUMN`
  | `DEVPOST_URL_COLUMN`
  | `DEVPOST_CATEGORY_COLUMN`
  | `DEVPOST_TABLE_NUMBER_COLUMN`;

const envKeys: { [key in ENV]: ENV } = {
  DATABASE_URL: `DATABASE_URL`,
  production: `production`,
  PORT: `PORT`,
  SENDGRID_API_KEY: `SENDGRID_API_KEY`,
  JUDGE_PASSWORD: `JUDGE_PASSWORD`,
  DEVPOST_TITLE_COLUMN: `DEVPOST_TITLE_COLUMN`,
  DEVPOST_URL_COLUMN: `DEVPOST_URL_COLUMN`,
  DEVPOST_CATEGORY_COLUMN: `DEVPOST_CATEGORY_COLUMN`,
  DEVPOST_TABLE_NUMBER_COLUMN: `DEVPOST_TABLE_NUMBER_COLUMN`,
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

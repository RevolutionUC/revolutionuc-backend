export const environment = {
  production: process.env.production === 'true',
  PORT: process.env.PORT,
  CRYPTO_KEY: process.env.CRYPTO_KEY,
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  judgePassword: process.env.JUDGE_PASSWORD,
  database_config: {
    url: process.env.DATABASE_URL,
    synchronize: process.env.production !== 'true',
    logging: true,
  },
};

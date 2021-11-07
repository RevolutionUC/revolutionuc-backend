import { system } from '../systems';

export const api = system.addContainer(
  'API Gateway',
  'API interface layer to authenticate and route requests to the appropriate microservice',
  'NestJS',
)!;

// export const database = system.addContainer(
//   'Database',
//   'Store for all the required data',
//   'PostgreSQL'
// )!;

export const emails = system.addContainer(
  'Email Server',
  'Stores and sends emails designed using templates',
  'Nunjucks, Gulp, Mailgun and Heroku',
)!;

export const assets = system.addContainer(
  'Assets',
  'S3 bucket to store important files',
  'AWS S3',
)!;

export const processQueue = system.addContainer(
  'Event Queue',
  'Queue to transport domain event messages',
  'RabbitMQ',
)!;

export const emailQueue = system.addContainer(
  'Email Queue',
  'Queue to transport email command messages',
  'RabbitMQ',
)!;

import { NestFactory } from '@nestjs/core';
import { Type, Logger } from '@nestjs/common';
import { SERVICE_TOKENS, QUEUE_TOKENS } from '@revuc/contract';
import { Configuration } from './config';
import { BootstrapToTcp } from './services';
import { BootstrapToQueue } from '.';

const logger = new Logger('Microservice Bootstrap');

export async function BootstrapMicroservice(
  token: keyof typeof SERVICE_TOKENS,
  queue: keyof typeof QUEUE_TOKENS,
  module: Type<any>,
) {
  logger.log(`Bootstrapping ${token} and ${queue}`);

  const serviceConfig = Configuration[token].tcp;
  const queueConfig = Configuration[queue];

  const app = await NestFactory.create(module);

  await BootstrapToTcp(app, serviceConfig);
  await BootstrapToQueue(app, queueConfig);

  await app.startAllMicroservices();
  await app.listen(serviceConfig.port);

  logger.log(
    `Microservice ${token} is listening on TCP port ` +
      `${serviceConfig.host}:${serviceConfig.port} ` +
      `and consuming from RMQ queue ${queueConfig.queue}`,
  );
}

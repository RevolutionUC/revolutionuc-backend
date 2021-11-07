import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { Type, Logger } from '@nestjs/common';
import { SERVICE_TOKENS } from '@revuc/contract';
import { Configuration } from './config';

const logger = new Logger('Microservice Bootstrap');

export async function BootstrapMicroservice(
  token: keyof typeof SERVICE_TOKENS,
  module: Type<any>,
) {
  logger.log(`Bootstrapping ${token}`);

  const app = await NestFactory.create(module);

  const tcpService = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: Configuration[token].host,
      port: Configuration[token].port,
    },
  });

  const rmqService = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'cats_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(Configuration[token].port);

  logger.log(
    `Microservice ${token} is listening on ${Configuration[token].host}:${Configuration[token].port}`,
  );
}

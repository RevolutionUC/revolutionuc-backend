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

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    module,
    {
      transport: Transport.TCP,
      options: {
        host: Configuration[token].host,
        port: Configuration[token].port,
      },
    },
  );

  await app.listen();

  logger.log(
    `Microservice ${token} is listening on ${Configuration[token].host}:${Configuration[token].port}`,
  );
}

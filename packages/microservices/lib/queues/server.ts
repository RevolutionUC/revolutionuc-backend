import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { INestApplication } from '@nestjs/common';
import { QUEUE_TOKENS } from '@revuc/contract';
import { Configuration } from '../config';

export async function BootstrapToQueue(
  queue: keyof typeof QUEUE_TOKENS,
  app: INestApplication,
) {
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: Configuration[queue].urls,
      queue: Configuration[queue].queue,
      queueOptions: {
        durable: false,
      },
    },
  });
}

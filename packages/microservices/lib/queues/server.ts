import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { INestApplication } from '@nestjs/common';

export async function BootstrapToQueue(
  app: INestApplication,
  options: {
    urls: string[];
    queue: string;
  },
) {
  return app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options,
  });
}

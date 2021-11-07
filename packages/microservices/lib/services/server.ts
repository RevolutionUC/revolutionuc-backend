import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { INestApplication } from '@nestjs/common';

export async function BootstrapToTcp(
  app: INestApplication,
  options: {
    host: string;
    port: number;
  },
) {
  return app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options,
  });
}

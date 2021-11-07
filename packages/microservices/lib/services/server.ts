import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { INestApplication } from '@nestjs/common';
import { SERVICE_TOKENS } from '@revuc/contract';
import { Configuration } from '../config';

export async function BootstrapToTcp(
  token: keyof typeof SERVICE_TOKENS,
  app: INestApplication,
) {
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: Configuration[token].tcp.host,
      port: Configuration[token].tcp.port,
    },
  });
}

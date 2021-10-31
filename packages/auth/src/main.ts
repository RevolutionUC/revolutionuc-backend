import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './auth/infrastructure/Environment/Config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const configService = ConfigService.getInstance();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: `0.0.0.0`,
        port: parseInt(configService.get('PORT'), 10),
      },
    },
  );

  await app.listen();
}
bootstrap();

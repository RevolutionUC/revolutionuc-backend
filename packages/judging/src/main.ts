import { config } from 'dotenv';
config();

import { BootstrapMicroservice } from '@revuc/microservices';
import { SERVICE_TOKENS, QUEUE_TOKENS } from '@revuc/contract';
import { AppModule } from './app.module';

async function bootstrap() {
  await BootstrapMicroservice(
    AppModule,
    SERVICE_TOKENS.JUDGING,
    QUEUE_TOKENS.EVENT_QUEUE,
  );
}
bootstrap();

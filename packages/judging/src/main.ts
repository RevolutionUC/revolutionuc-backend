import { config } from 'dotenv';
config();

import { BootstrapMicroservice } from '@revuc/microservices';
import { SERVICE_TOKENS } from '@revuc/contract';
import { AppModule } from './app.module';

async function bootstrap() {
  await BootstrapMicroservice(SERVICE_TOKENS.JUDGING, AppModule);
}
bootstrap();

import { DynamicModule, Module, Logger } from '@nestjs/common';
import {
  ClientProviderOptions,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { QUEUE_TOKENS } from '@revuc/contract';
import { Configuration } from '../config';

@Module({})
export class QueueModule {
  static register(tokens: Array<keyof typeof QUEUE_TOKENS>): DynamicModule {
    const logger = new Logger('QueueModule');
    tokens.forEach((token) => {
      logger.log(`Registering ${token}`);
    });

    return {
      module: QueueModule,
      imports: [
        ClientsModule.register(
          tokens.map<ClientProviderOptions>((token) => ({
            name: token,
            transport: Transport.RMQ,
            options: Configuration[token],
          })),
        ),
      ],
      exports: [ClientsModule],
    };
  }
}

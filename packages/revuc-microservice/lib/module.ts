import { DynamicModule, Module } from '@nestjs/common';
import {
  ClientProviderOptions,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { SERVICE_TOKENS } from '@revuc/contract';
import { Configuration } from './config';

@Module({})
export class MicroserviceModule {
  static register(tokens: Array<keyof typeof SERVICE_TOKENS>): DynamicModule {
    return {
      module: MicroserviceModule,
      imports: [
        ClientsModule.register(
          tokens.map<ClientProviderOptions>((token) => ({
            name: token,
            transport: Transport.TCP,
            options: {
              host: Configuration[token].host,
              port: Configuration[token].port,
            },
          })),
        ),
      ],
      exports: [ClientsModule],
    };
  }
}

import { DynamicModule, Module } from "@nestjs/common";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_TOKENS } from "@revuc/contract"

@Module({})
export class MicroserviceModule {
  static register(tokens: Array<keyof typeof SERVICE_TOKENS>): DynamicModule {
    return {
      module: MicroserviceModule,
      imports: [ClientsModule.register(tokens.map(token => ({
          name: token,
          transport: Transport.TCP,
        })))],
        exports: [ClientsModule]
    }
  }
}
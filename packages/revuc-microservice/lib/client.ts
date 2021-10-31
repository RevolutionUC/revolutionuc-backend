import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { SERVICE_TOKENS, CQRS_TOKENS } from '@revuc/contract';

const { COMMAND_TOKEN, QUERY_TOKEN } = CQRS_TOKENS;

const METADATA_KEY = 'MICROSERVICE-METADATA';

export const Microservice = (
  token: keyof typeof SERVICE_TOKENS,
): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(METADATA_KEY, token, target);
  };
};

export class MicroserviceClient implements OnModuleInit {
  private token: keyof typeof SERVICE_TOKENS;
  private client: ClientProxy;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.token = Reflect.getMetadata(METADATA_KEY, this);
    this.client = this.moduleRef.get(this.token);
  }

  protected async sendCommand(command: string, dto: any): Promise<void> {
    return lastValueFrom(
      this.client.send<void>(`${this.token}.${COMMAND_TOKEN}.${command}`, dto),
    );
  }

  protected async sendQuery(query: string, dto: any): Promise<any> {
    return lastValueFrom(
      this.client.send<void>(`${this.token}.${QUERY_TOKEN}.${query}`, dto),
    );
  }
}

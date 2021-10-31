import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

const METADATA_KEY = 'MICROSERVICE-TOKEN';

export const Microservice = (token: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(METADATA_KEY, token, target);
  };
};

export class MicroserviceClient implements OnModuleInit {
  private token: string;
  private client: ClientProxy;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.token = Reflect.getMetadata(METADATA_KEY, this);
    this.client = this.moduleRef.get(this.token);
  }

  protected async sendCommand(command: string, dto: any): Promise<void> {
    return lastValueFrom(
      this.client.send<void>(`${this.token}.cmd.${command}`, dto),
    );
  }

  protected async sendQuery(query: string, dto: any): Promise<any> {
    return lastValueFrom(
      this.client.send<void>(`${this.token}.query.${query}`, dto),
    );
  }
}

import { OnModuleInit, Logger } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { QUEUE_TOKENS, MESSAGE_TOKENS } from '@revuc/contract';

const queueToMessage = (queue: keyof typeof QUEUE_TOKENS) => {
  if (queue === 'EVENT_QUEUE') {
    return MESSAGE_TOKENS.EVENT_TOKEN;
  }
  return MESSAGE_TOKENS.EMAIL_TOKEN;
};

const METADATA_KEY = 'QUEUE-METADATA';

export const Queue = (token: keyof typeof QUEUE_TOKENS): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(METADATA_KEY, token, target);
  };
};

export abstract class QueueClient implements OnModuleInit {
  private token: keyof typeof QUEUE_TOKENS;
  private client: ClientProxy;
  private logger: Logger;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.token = Reflect.getMetadata(METADATA_KEY, this);
    this.client = this.moduleRef.get(this.token);
    this.logger = new Logger(`${this.token} Client`);

    this.logger.log(`Client initialized`);
  }

  protected async send(message: string, dto: any): Promise<void> {
    this.logger.log(`Sending message ${message}`);

    return lastValueFrom(
      this.client.send<void>(`${queueToMessage(this.token)}.${message}`, dto),
    );
  }
}

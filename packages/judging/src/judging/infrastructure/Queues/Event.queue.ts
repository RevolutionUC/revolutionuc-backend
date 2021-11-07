import { Injectable } from '@nestjs/common';
import { QUEUE_TOKENS } from '@revuc/contract';
import { EVENTS, Payloads } from '@revuc/contract/messages';
import { Queue, QueueClient } from '@revuc/microservices/lib';

@Injectable()
@Queue(QUEUE_TOKENS.EVENT_QUEUE)
export class EventClient extends QueueClient {
  emitEvent<E extends keyof typeof EVENTS>(email: E, data: Payloads[E]) {
    return this.send(email, data);
  }
}

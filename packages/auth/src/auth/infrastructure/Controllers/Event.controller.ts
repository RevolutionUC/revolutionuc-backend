import { Controller } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import {
  EVENTS as Events,
  Payloads as EventPayloads,
} from '@revuc/contract/messages/events';
import { Event } from './handlers';
import {
  UserCreatedEvent,
  UserRemovedEvent,
} from '../../application/Events/Impl';

@Controller()
export class EventController {
  constructor(private readonly eventBus: EventBus) {}

  @Event(Events.USER_CREATED)
  async createUser(dto: EventPayloads[typeof Events.USER_CREATED]) {
    const event = new UserCreatedEvent(
      dto.username,
      dto.password,
      dto.role,
      dto.scope,
    );

    return this.eventBus.publish(event);
  }

  @Event(Events.USER_REMOVED)
  async removeUser(dto: EventPayloads[typeof Events.USER_REMOVED]) {
    const event = new UserRemovedEvent(dto.username);

    return this.eventBus.publish(event);
  }
}

import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IUserRepository } from '../../Interfaces';
import { UserRemovedEvent } from '../Impl';

@EventsHandler(UserRemovedEvent)
export class UserRemovedHandler implements IEventHandler<UserRemovedEvent> {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async handle(event: UserRemovedEvent) {
    const { username } = event;

    await this.userRepository.deleteByUsername(username);
  }
}

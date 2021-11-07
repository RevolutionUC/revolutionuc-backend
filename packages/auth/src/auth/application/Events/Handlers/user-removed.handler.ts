import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/domain/user/user.entity';
import { Repository } from 'typeorm';
import { UserRemovedEvent } from '../Impl';

@EventsHandler(UserRemovedEvent)
export class UserRemovedHandler implements IEventHandler<UserRemovedEvent> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async handle(event: UserRemovedEvent) {
    const { username } = event;

    await this.userRepository.delete({ username });
  }
}

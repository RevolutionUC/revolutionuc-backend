import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/domain/user/user.entity';
import { Repository } from 'typeorm';
import { RemoveUserCommand } from '../Impl/remove-user.command';

@CommandHandler(RemoveUserCommand)
export class RemoveUserHandler implements ICommandHandler<RemoveUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: RemoveUserCommand) {
    const { username } = command;

    await this.userRepository.delete({ username });
  }
}

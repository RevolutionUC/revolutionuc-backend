import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/domain/user/user.entity';
import { AuthenticateService } from 'src/auth/infrastructure/Services/Authenticate.service';
import { Repository } from 'typeorm';
import { ChangePasswordCommand } from '../Impl/change-password';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authenticateService: AuthenticateService,
  ) {}

  async execute(command: ChangePasswordCommand) {
    const { token, password } = command;

    const { userId } = await this.authenticateService.validateToken(token);

    const user = await this.userRepository.findOne(userId);

    await user.changePassword(password);

    await this.userRepository.save(user);
  }
}

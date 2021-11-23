import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IHashService, ITokenService, IUserRepository } from '../../Interfaces';
import { ChangePasswordCommand } from '../Impl/change-password';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private readonly tokenService: ITokenService,
    private readonly hashService: IHashService,
  ) {}

  async execute(command: ChangePasswordCommand) {
    const { token, password } = command;

    const { userId } = await this.tokenService.validateToken(token);
    const hashedPassword = await this.hashService.hash(password);

    const user = await this.userRepository.findById(userId);

    user.changePassword(hashedPassword);

    await this.userRepository.save(user);
  }
}

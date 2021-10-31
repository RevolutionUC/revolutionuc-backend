import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/auth/domain/role/role.entity';
import { User } from 'src/auth/domain/user/user.entity';
import { AuthenticateService } from 'src/auth/infrastructure/Services/Authenticate.service';
import { Repository } from 'typeorm';
import { CheckPermissionCommand } from '../Impl/check-permission.command';

@CommandHandler(CheckPermissionCommand)
export class CheckPermissionHandler
  implements ICommandHandler<CheckPermissionCommand>
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly authenticateService: AuthenticateService,
  ) {}

  async execute(command: CheckPermissionCommand) {
    const { token, role: roleName, scope } = command;
    const { userId } = await this.authenticateService.validateToken(token);

    const role = await this.roleRepository.findOne({
      where: { name: roleName },
    });

    if (!role) {
      throw new Error('Role not found');
    }

    const user = await this.userRepository.findOne({
      where: { id: userId, scope, role: role.id },
    });

    if (!user) {
      throw new Error('User not found');
    }
  }
}

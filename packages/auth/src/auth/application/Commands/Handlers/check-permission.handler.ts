import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/auth/domain/role/role.entity';
import { User } from 'src/auth/domain/user/user.entity';
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
  ) {}

  async execute(command: CheckPermissionCommand) {
    const { username, password, role: roleName, scope } = command;
    const role = await this.roleRepository.findOne({
      where: { name: roleName },
    });

    if (!role) {
      throw new Error('Role not found');
    }

    const user = await this.userRepository.findOne({
      where: { username, scope, role: role.id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const authenticated = await user.comparePassword(password);

    if (!authenticated) {
      throw new Error('User not found');
    }
  }
}

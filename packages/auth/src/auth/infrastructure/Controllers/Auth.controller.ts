import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { CheckPermissionCommand } from 'src/auth/application/Commands/Impl/check-permission.command';
import { CreateUserCommand } from 'src/auth/application/Commands/Impl/create-user.command';
import { RemoveUserCommand } from 'src/auth/application/Commands/Impl/remove-user.command';

@Controller()
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern('auth.cmd.create-user')
  async createUser(dto: {
    username: string;
    password: string;
    role: string;
    scope: string;
  }) {
    const command = new CreateUserCommand(
      dto.username,
      dto.password,
      dto.role,
      dto.scope,
    );

    return this.commandBus.execute(command);
  }

  @MessagePattern('auth.cmd.remove-user')
  async removeUser(dto: { username: string }) {
    const command = new RemoveUserCommand(dto.username);

    return this.commandBus.execute(command);
  }

  @MessagePattern('auth.cmd.check-permission')
  async checkPermission(dto: {
    username: string;
    password: string;
    role: string;
    scope: string;
  }) {
    const command = new CheckPermissionCommand(
      dto.username,
      dto.password,
      dto.role,
      dto.scope,
    );

    return this.commandBus.execute(command);
  }
}

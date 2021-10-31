import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { ChangePasswordCommand } from 'src/auth/application/Commands/Impl/change-password';
import { CheckPermissionQuery } from 'src/auth/application/Queries/Impl/check-permission.query';
import { CreateUserCommand } from 'src/auth/application/Commands/Impl/create-user.command';
import { RemoveUserCommand } from 'src/auth/application/Commands/Impl/remove-user.command';
import {
  LoginQuery,
  LoginResult,
} from 'src/auth/application/Queries/Impl/login.query';
import {
  PasswordResetQuery,
  PasswordResetResult,
} from 'src/auth/application/Queries/Impl/password-reset.query';

@Controller()
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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

  @MessagePattern('auth.cmd.change-password')
  async changePassword(dto: { token: string; password: string }) {
    const command = new ChangePasswordCommand(dto.token, dto.password);

    return this.commandBus.execute(command);
  }

  @MessagePattern('auth.query.login')
  async login(dto: { username: string; password: string }) {
    const query = new LoginQuery(dto.username, dto.password);

    return this.queryBus.execute<LoginQuery, LoginResult>(query);
  }

  @MessagePattern('auth.query.check-permission')
  async checkPermission(dto: { token: string; role: string; scope: string }) {
    const query = new CheckPermissionQuery(dto.token, dto.role, dto.scope);

    return this.queryBus.execute<CheckPermissionQuery, void>(query);
  }

  @MessagePattern('auth.query.pasword-reset')
  async passwordReset(dto: { username: string }) {
    const query = new PasswordResetQuery(dto.username);

    return this.queryBus.execute<PasswordResetQuery, PasswordResetResult>(
      query,
    );
  }
}

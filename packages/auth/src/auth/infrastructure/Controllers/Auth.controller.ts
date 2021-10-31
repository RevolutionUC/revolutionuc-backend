import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Command, Query } from './handlers';
import {
  Tokens as Commands,
  Props as CommandProps,
} from '@revuc/contract/auth/commands';
import {
  Tokens as Queries,
  Props as QueryProps,
  Response,
} from '@revuc/contract/auth/queries';
import {
  CreateUserCommand,
  RemoveUserCommand,
  ChangePasswordCommand,
} from 'src/auth/application/Commands/Impl';
import {
  LoginQuery,
  LoginResult,
  CheckPermissionQuery,
  PasswordResetQuery,
  PasswordResetResult,
} from 'src/auth/application/Queries/Impl';

@Controller()
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Command(Commands.CREATE_USER)
  async createUser(dto: CommandProps[typeof Commands.CREATE_USER]) {
    const command = new CreateUserCommand(
      dto.username,
      dto.password,
      dto.role,
      dto.scope,
    );

    return this.commandBus.execute(command);
  }

  @Command(Commands.REMOVE_USER)
  async removeUser(dto: CommandProps[typeof Commands.REMOVE_USER]) {
    const command = new RemoveUserCommand(dto.username);

    return this.commandBus.execute(command);
  }

  @Command(Commands.CHANGE_PASSWORD)
  async changePassword(dto: CommandProps[typeof Commands.CHANGE_PASSWORD]) {
    const command = new ChangePasswordCommand(dto.token, dto.password);

    return this.commandBus.execute(command);
  }

  @Query(Queries.LOGIN)
  async login(
    dto: QueryProps[typeof Queries.LOGIN],
  ): Promise<Response[typeof Queries.LOGIN]> {
    const query = new LoginQuery(dto.username, dto.password);

    return this.queryBus.execute<LoginQuery, LoginResult>(query);
  }

  @Query(Queries.CHECK_PERMISSION)
  async checkPermission(
    dto: QueryProps[typeof Queries.CHECK_PERMISSION],
  ): Promise<void> {
    const query = new CheckPermissionQuery(dto.token, dto.role, dto.scope);

    return this.queryBus.execute<CheckPermissionQuery, void>(query);
  }

  @Query(Queries.PASWORD_RESET)
  async passwordReset(
    dto: QueryProps[typeof Queries.PASWORD_RESET],
  ): Promise<Response[typeof Queries.PASWORD_RESET]> {
    const query = new PasswordResetQuery(dto.username);

    return this.queryBus.execute<PasswordResetQuery, PasswordResetResult>(
      query,
    );
  }
}

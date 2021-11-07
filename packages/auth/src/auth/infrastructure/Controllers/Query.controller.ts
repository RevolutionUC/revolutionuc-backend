import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  Tokens as Queries,
  Props as QueryProps,
  Response,
} from '@revuc/contract/auth/queries';
import { Query } from './handlers';
import {
  LoginQuery,
  LoginResult,
  CheckPermissionQuery,
  PasswordResetQuery,
  PasswordResetResult,
} from '../../application/Queries/Impl';

@Controller()
export class QueryController {
  constructor(private readonly queryBus: QueryBus) {}

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

import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import {
  IRoleRepository,
  ITokenService,
  IUserRepository,
} from '../../Interfaces';
import { CheckPermissionQuery } from '../Impl/check-permission.query';

@QueryHandler(CheckPermissionQuery)
export class CheckPermissionHandler
  implements IQueryHandler<CheckPermissionQuery, void>
{
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(IRoleRepository)
    private readonly roleRepository: IRoleRepository,
    private readonly tokenService: ITokenService,
  ) {}

  async execute(query: CheckPermissionQuery) {
    const { token, role: roleName, scope } = query;
    const { userId } = await this.tokenService.validateToken(token);

    const role = await this.roleRepository.findByName(roleName);

    if (!role) {
      throw new Error('Role not found');
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    user.checkPermission(role.id, scope);

    return;
  }
}

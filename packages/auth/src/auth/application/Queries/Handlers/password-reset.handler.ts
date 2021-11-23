import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ITokenService, IUserRepository } from '../../Interfaces';
import {
  PasswordResetQuery,
  PasswordResetResult,
} from '../Impl/password-reset.query';
import { Inject } from '@nestjs/common';

@QueryHandler(PasswordResetQuery)
export class PasswordResetHandler
  implements IQueryHandler<PasswordResetQuery, PasswordResetResult>
{
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private readonly tokenService: ITokenService,
  ) {}

  async execute(query: PasswordResetQuery): Promise<PasswordResetResult> {
    const { username } = query;

    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new Error('User not found');
    }

    const token = await this.tokenService.generateToken({ userId: user.id });

    return new PasswordResetResult(token);
  }
}

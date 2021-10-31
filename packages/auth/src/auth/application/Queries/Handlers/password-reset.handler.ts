import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/domain/user/user.entity';
import { AuthenticateService } from 'src/auth/infrastructure/Services/Authenticate.service';
import { Repository } from 'typeorm';
import {
  PasswordResetQuery,
  PasswordResetResult,
} from '../Impl/password-reset.query';

@QueryHandler(PasswordResetQuery)
export class PasswordResetHandler
  implements IQueryHandler<PasswordResetQuery, PasswordResetResult>
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authenticateService: AuthenticateService,
  ) {}

  async execute(query: PasswordResetQuery): Promise<PasswordResetResult> {
    const { username } = query;

    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const token = await this.authenticateService.generateToken({
      userId: user.id,
    });

    return new PasswordResetResult(token);
  }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/domain/user/user.entity';
import { AuthenticateService } from 'src/auth/infrastructure/Services/Authenticate.service';
import { Repository } from 'typeorm';
import { LoginQuery, LoginResult } from '../Impl/login.query';

@QueryHandler(LoginQuery)
export class LoginHandler implements IQueryHandler<LoginQuery, LoginResult> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authenticateService: AuthenticateService,
  ) {}

  async execute(query: LoginQuery): Promise<LoginResult> {
    const { username, password } = query;

    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const legit = await user.password.compare(password);

    if (!legit) {
      throw new Error('Invalid password');
    }

    const token = await this.authenticateService.generateToken({
      userId: user.id,
    });

    return new LoginResult(token);
  }
}

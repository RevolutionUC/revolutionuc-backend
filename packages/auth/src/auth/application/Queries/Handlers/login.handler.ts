import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ITokenService, IHashService, IUserRepository } from '../../Interfaces';
import { LoginQuery, LoginResult } from '../Impl/login.query';

@QueryHandler(LoginQuery)
export class LoginHandler implements IQueryHandler<LoginQuery, LoginResult> {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private readonly tokenService: ITokenService,
    private readonly hashService: IHashService,
  ) {}

  async execute(query: LoginQuery): Promise<LoginResult> {
    const { username, password } = query;

    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new Error('User not found');
    }

    const legit = await this.hashService.compare(password, user.password);

    if (!legit) {
      throw new Error('Invalid password');
    }

    const token = await this.tokenService.generateToken({ userId: user.id });

    return new LoginResult(token);
  }
}

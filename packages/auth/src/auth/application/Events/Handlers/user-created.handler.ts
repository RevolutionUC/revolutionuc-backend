import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { User } from 'src/auth/domain/user/user.entity';
import {
  ITokenService,
  IHashService,
  IUserRepository,
  IRoleRepository,
} from '../../Interfaces';
import { UserCreatedEvent } from '../Impl';

@EventsHandler(UserCreatedEvent)
export class CreateUserHandler implements IEventHandler<UserCreatedEvent> {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(IRoleRepository)
    private readonly roleRepository: IRoleRepository,
    private readonly tokenService: ITokenService,
    private readonly hashService: IHashService,
  ) {}

  async handle(event: UserCreatedEvent) {
    const { username, password, role: roleName, scope } = event;

    const existingUser = await this.userRepository.findByUsername(username);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const role = await this.roleRepository.findByName(roleName);

    if (!role) {
      throw new Error('Role does not exist');
    }

    const hashedPassword = await this.hashService.hash(password);

    const user = await User.create(username, hashedPassword, role.id, scope);

    await this.userRepository.save(user);
  }
}

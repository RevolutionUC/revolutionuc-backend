import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/auth/domain/role/role.entity';
import { User } from 'src/auth/domain/user/user.entity';
import { Repository } from 'typeorm';
import { UserCreatedEvent } from '../Impl';

@EventsHandler(UserCreatedEvent)
export class CreateUserHandler implements IEventHandler<UserCreatedEvent> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async handle(event: UserCreatedEvent) {
    const { username, password, role: roleName, scope } = event;

    const existingUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const role = await this.roleRepository.findOne({
      where: { name: roleName },
    });

    if (!role) {
      throw new Error('Role does not exist');
    }

    const user = await User.create(username, password, role.id, scope);

    await this.userRepository.save(user);
  }
}

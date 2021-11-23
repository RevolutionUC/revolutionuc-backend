import { getCustomRepositoryToken } from '@nestjs/typeorm';
import { IUserRepository, IRoleRepository } from '../../application/Interfaces';
import { RoleRepository } from './Role.repository';
import { UserRepository } from './User.repository';

export const Repositories = [
  {
    provide: IUserRepository,
    useExisting: getCustomRepositoryToken(UserRepository),
  },
  {
    provide: IRoleRepository,
    useExisting: getCustomRepositoryToken(RoleRepository),
  },
];

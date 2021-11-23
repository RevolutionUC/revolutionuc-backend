import { User } from '../../../domain/user/user.entity';

export interface IUserRepository {
  save(user: User): Promise<User>;
  save(users: User[]): Promise<User[]>;
  findById(id: string): Promise<User>;
  findByUsername(username: string): Promise<User>;
  deleteByUsername(username: string): Promise<void>;
}

export const IUserRepository = Symbol('IUserRepository');

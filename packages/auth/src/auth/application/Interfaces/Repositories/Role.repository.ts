import { Role } from '../../../domain/role/role.entity';

export interface IRoleRepository {
  save(role: Role): Promise<Role>;
  save(roles: Role[]): Promise<Role[]>;
  findByName(name: string): Promise<Role>;
}

export const IRoleRepository = Symbol('IRoleRepository');

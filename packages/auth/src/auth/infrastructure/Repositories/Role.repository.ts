import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IRoleRepository } from '../../application/Interfaces';
import { Role } from '../../domain/role/role.entity';

@Injectable()
export class RoleRepository
  extends Repository<Role>
  implements IRoleRepository
{
  findByName(name: string): Promise<Role> {
    return this.findOne({ name });
  }
}

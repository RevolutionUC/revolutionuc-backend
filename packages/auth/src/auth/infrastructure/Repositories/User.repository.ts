import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../application/Interfaces';
import { User } from '../../domain/user/user.entity';

@Injectable()
export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  findById(id: string): Promise<User> {
    return this.findOne(id);
  }

  findByUsername(username: string): Promise<User> {
    return this.findOne({ username });
  }

  async deleteByUsername(username: string): Promise<void> {
    await this.delete({ username });
  }
}

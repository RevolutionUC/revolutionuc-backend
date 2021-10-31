import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash, compare } from 'bcrypt';

@Entity()
export class User {
  static async create(
    username: string,
    password: string,
    roleId: string,
    scope: string,
  ): Promise<User> {
    const user = new User();

    user.username = username;
    user.role = roleId;
    user.scope = scope;
    user.password = await hash(password, 10);

    return user;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  scope: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  role: string;

  async changePassword(newPassword: string) {
    this.password = await hash(newPassword, 10);
  }

  comparePassword(attempt: string): Promise<boolean> {
    return compare(attempt, this.password);
  }

  checkPermission(role: string, scope: string): boolean {
    return this.role === role && this.scope === scope;
  }
}

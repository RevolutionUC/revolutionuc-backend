import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Password } from './password';

@Entity()
export class User {
  static async create(
    username: string,
    password: string,
    roleId: string,
    scope: string,
  ) {
    const user = new User();

    user.username = username;
    user.password = await Password.create(password);
    user.role = roleId;
    user.scope = scope;

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
  @Column({
    transformer: {
      to: (password: Password) => password.toString(),
      from: (password: string) => new Password(password),
    },
  })
  password: Password;

  @IsNotEmpty()
  @IsString()
  @Column()
  scope: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  role: string;

  async changePassword(newPassword: string) {
    this.password = await Password.create(newPassword);
  }

  checkPermission(role: string, scope: string): boolean {
    return this.role === role && this.scope === scope;
  }
}

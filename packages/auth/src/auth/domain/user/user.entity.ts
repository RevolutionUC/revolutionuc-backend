import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
    user.password = password;
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

  changePassword(newPassword: string) {
    this.password = newPassword;
  }

  checkPermission(role: string, scope: string): void {
    const legit = this.role === role && this.scope === scope;

    if (!legit) {
      throw new Error('User does not have permission');
    }
  }
}

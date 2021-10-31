import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from '../application/application.module';
import { Role } from '../domain/role/role.entity';
import { User } from '../domain/user/user.entity';
import { AuthController } from './Controllers/Auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    CqrsModule,
    ApplicationModule,
  ],
  controllers: [AuthController],
})
export class InfrastructureModule {}

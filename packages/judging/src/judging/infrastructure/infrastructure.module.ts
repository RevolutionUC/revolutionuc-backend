import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from '../application/application.module';
import { Category } from '../domain/category/category.entity';
import { Group } from '../domain/category/group.entity';
import { Judge } from '../domain/category/judge.entity';
import { Submission } from '../domain/category/submission.entity';
import { Project } from '../domain/project/project.entity';
import { CommandController } from './Controllers/Command.controller';
import { QueryController } from './Controllers/Query.controller';
import { CategoryRepository } from './Repositories/Category.repository';
import { ProjectRepository } from './Repositories/Project.repository';
import { AuthService, AUTH_TOKEN } from './Services/Auth.service';
import { EmailService, EMAIL_TOKEN } from './Services/Email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectRepository,
      CategoryRepository,
      Project,
      Category,
      Submission,
      Judge,
      Group,
    ]),
    ClientsModule.register([
      { name: AUTH_TOKEN, transport: Transport.TCP },
      { name: EMAIL_TOKEN, transport: Transport.TCP },
    ]),
    ApplicationModule,
  ],
  controllers: [CommandController, QueryController],
  providers: [AuthService, EmailService],
})
export class InfrastructureModule {}

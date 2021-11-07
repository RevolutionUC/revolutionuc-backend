import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SERVICE_TOKENS } from '@revuc/contract';
import { MicroserviceModule } from '@revuc/microservices';
import { ApplicationModule } from '../application/application.module';
import { Judge } from '../domain/entities/judge/judge.entity';
import { Submission } from '../domain/entities/submission/submission.entity';
import { Project } from '../domain/entities/project/project.entity';
import { CommandController } from './Controllers/Command.controller';
import { QueryController } from './Controllers/Query.controller';
import { CategoryRepository } from './Repositories/Category.repository';
import { ProjectRepository } from './Repositories/Project.repository';
import { AuthService } from './Services/Auth.service';
import { EmailService } from './Services/Email.service';
import { Category } from '../domain/entities/category/category.entity';
import { Group } from '../domain/entities/group/group.entity';

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
    MicroserviceModule.register([SERVICE_TOKENS.AUTH, SERVICE_TOKENS.EMAIL]),
    ApplicationModule,
  ],
  controllers: [CommandController, QueryController],
  providers: [AuthService, EmailService],
})
export class InfrastructureModule {}

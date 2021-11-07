import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QUEUE_TOKENS } from '@revuc/contract';
import { QueueModule } from '@revuc/microservices';
import { ApplicationModule } from '../application/application.module';
import { CommandController } from './Controllers/Command.controller';
import { QueryController } from './Controllers/Query.controller';
import { EventClient } from './Queues/Event.queue';
import { EmailClient } from './Queues/Email.queue';
import { Category } from '../domain/entities/category/category.entity';
import { Group } from '../domain/entities/group/group.entity';
import { Judge } from '../domain/entities/judge/judge.entity';
import { Submission } from '../domain/entities/submission/submission.entity';
import { Project } from '../domain/entities/project/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Category, Submission, Judge, Group]),
    QueueModule.register([QUEUE_TOKENS.EMAIL_QUEUE, QUEUE_TOKENS.EVENT_QUEUE]),
    ApplicationModule,
  ],
  controllers: [CommandController, QueryController],
  providers: [EventClient, EmailClient],
})
export class InfrastructureModule {}

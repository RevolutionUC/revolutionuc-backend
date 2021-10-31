import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { CommandHandler } from './Commands/Command.handler';
import { QueryHandler } from './Queries/Query.handler';

@Module({
  imports: [DomainModule],
  providers: [CommandHandler, QueryHandler],
  exports: [CommandHandler, QueryHandler],
})
export class ApplicationModule {}

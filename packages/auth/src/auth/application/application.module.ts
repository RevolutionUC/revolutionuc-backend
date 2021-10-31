import { Module } from '@nestjs/common';
// import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './Commands/Handlers';
import { QueryHandlers } from './Queries/Handlers';

const Handlers = [...CommandHandlers, ...QueryHandlers];

@Module({
  // imports: [CqrsModule],
  providers: [...Handlers],
  exports: [...Handlers],
})
export class ApplicationModule {}

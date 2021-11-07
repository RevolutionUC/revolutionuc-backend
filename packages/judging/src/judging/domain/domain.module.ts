import { Module } from '@nestjs/common';
import {
  SubmissionService,
  AssignmentService,
  ScoringService,
} from './services';

@Module({
  imports: [],
  providers: [SubmissionService, AssignmentService, ScoringService],
  exports: [SubmissionService, AssignmentService, ScoringService],
})
export class DomainModule {}

import { Module } from '@nestjs/common';
import { SubmissionService } from './services/submission.service';

@Module({
  imports: [],
  providers: [SubmissionService],
  exports: [SubmissionService],
})
export class DomainModule {}

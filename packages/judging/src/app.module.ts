import { Module } from '@nestjs/common';
import { JudgingModule } from './judging/judging.module';

@Module({
  imports: [JudgingModule],
})
export class AppModule {}

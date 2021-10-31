import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from './email.service';
import { AuthModule } from 'src/auth/auth.module';
import { Judge } from 'src/judging/domain/aggregates/category/judge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Judge]), AuthModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from './email.service';
import { Judge } from 'src/judging/entities/judge.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Judge]), AuthModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}

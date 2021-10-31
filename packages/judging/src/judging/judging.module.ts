import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JudgeController } from './judge/judge.controller';
import { AdminController } from './admin/admin.controller';
import { JudgeService } from './judge/judge.service';
import { AdminService } from './admin/admin.service';
import { EmailModule } from '../email/email.module';
import { AuthModule } from '../auth/auth.module';
import { Category } from './domain/aggregates/category/category.entity';
import { Group } from './domain/aggregates/category/group.entity';
import { Submission } from './domain/aggregates/category/submission.entity';
import { Judge } from './domain/aggregates/category/judge.entity';
import { Project } from './domain/project/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Judge, Category, Group, Submission]),
    EmailModule,
    AuthModule,
  ],
  controllers: [JudgeController, AdminController],
  providers: [JudgeService, AdminService],
})
export class JudgingModule {}

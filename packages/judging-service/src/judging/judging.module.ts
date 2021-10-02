import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Judge } from './entities/judge.entity';
import { JudgeController } from './judge/judge.controller';
import { AdminController } from './admin/admin.controller';
import { JudgeService } from './judge/judge.service';
import { AdminService } from './admin/admin.service';
import { JudgingConfig } from './entities/config.entity';
import { Category } from './entities/category.entity';
import { Submission } from './entities/submission.entity';
import { Group } from './entities/group.entity';
import { EmailModule } from '../email/email.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JudgingConfig,
      Project,
      Judge,
      Category,
      Group,
      Submission,
    ]),
    EmailModule,
    AuthModule,
  ],
  controllers: [JudgeController, AdminController],
  providers: [JudgeService, AdminService],
})
export class JudgingModule {}

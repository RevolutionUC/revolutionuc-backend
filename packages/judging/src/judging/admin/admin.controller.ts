import {
  Post,
  Body,
  Controller,
  Param,
  Get,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JudgeDto } from '../dtos/judge.dto';
import { AdminService } from './admin.service';
import { Category } from '../domain/aggregates/category/category.entity';
import { Group } from '../domain/aggregates/category/group.entity';
import { Judge } from '../domain/aggregates/category/judge.entity';
import { Submission } from '../domain/aggregates/category/submission.entity';
import { Project } from '../domain/aggregates/project/project.entity';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get(`judge`)
  getJudges(): Promise<Array<Judge>> {
    return this.adminService.getJudges();
  }

  @Post(`judge`)
  createJudge(@Body() judge: JudgeDto): Promise<Judge> {
    return this.adminService.registerJudge(judge);
  }

  @Delete(`judge/:id`)
  deleteJudge(@Param(`id`) id: string): Promise<void> {
    return this.adminService.deleteJudge(id);
  }

  @Post(`judge/:id/email`)
  sendEmail(@Param(`id`) id: string): Promise<void> {
    return this.adminService.sendEmail(id);
  }

  @Get(`project`)
  getProjects(): Promise<Array<Project>> {
    return this.adminService.getProjects();
  }

  @Put(`project/:id/disqualified`)
  qualifyProject(
    @Param(`id`) id: string,
    @Body() data: { disqualified?: string },
  ): Promise<void> {
    return this.adminService.qualifyProject(id, data.disqualified);
  }

  @Post(`devpost`)
  @UseInterceptors(FileInterceptor('file'))
  uploadDevpostCsv(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Array<Submission>> {
    return this.adminService.uploadDevpostCsv(file);
  }

  @Get(`category`)
  getCategories(): Promise<Array<Category>> {
    return this.adminService.getCategories();
  }

  @Get(`group`)
  getGroups(): Promise<Array<Group>> {
    return this.adminService.getGroups();
  }

  @Post(`assignment`)
  initiateAssignment(): Promise<Array<Group>> {
    return this.adminService.initiateAssignment();
  }

  @Get(`prizing`)
  getPrizingInfo(): Promise<Array<Submission>> {
    return this.adminService.getPrizingInfo();
  }

  @Post(`prizing`)
  scoreSubmissions(): Promise<void> {
    return this.adminService.scoreSubmissions();
  }
}

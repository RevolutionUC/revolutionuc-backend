import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { EmailService } from 'src/email/email.service';
import { ENV } from 'src/environment';
import { devpostParser } from 'src/util';
import { Repository } from 'typeorm';
import { Category } from '../../domain/aggregates/category/category.entity';
import { Judge } from '../../domain/aggregates/category/judge.entity';
import { Project } from '../../domain/aggregates/project/project.entity';
import { SubmissionService } from '../../domain/services/Submission.service';
import { CategoryDto } from '../../dtos/category.dto';
import { JudgeDto } from '../../dtos/judge.dto';
import { ProjectDto } from '../../dtos/project.dto';
import { RankingGuard } from './Ranking.guard';

@Injectable()
export class CommandService {
  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    private readonly emailService: EmailService,
    private readonly authService: AuthService,

    private readonly submissionService: SubmissionService,
  ) {}

  private async submitProjects(projectsData: Array<ProjectDto>): Promise<void> {
    const categories = await this.categoryRepository.find();

    const projects = projectsData.map((projectData) => {
      return this.submissionService.submitProject(projectData, categories);
    });

    await this.projectRepository.save(projects);
    await this.categoryRepository.save(categories);
  }

  async createCategory(categoryData: CategoryDto): Promise<void> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: categoryData.name },
    });

    if (existingCategory) {
      throw new Error('Category already exists');
    }

    const category = Category.create(categoryData);

    await this.categoryRepository.save(category);
  }

  async registerJudge(dto: JudgeDto): Promise<void> {
    const JUDGE_PASSWORD = this.configService.get(ENV.JUDGE_PASSWORD);
    const category = await this.categoryRepository.findOneOrFail(dto.category);

    const { user } = await this.authService.register(
      dto.email,
      JUDGE_PASSWORD,
      `JUDGE`,
    );

    const judge = Judge.create(user.id, dto.name, dto.email);

    category.assignJudge(judge);

    await this.categoryRepository.save(category);
  }

  async removeJudge(categoryId: string, judgeId: string): Promise<void> {
    const category = await this.categoryRepository.findOne(categoryId);

    const judge = category.judges.find((judge) => judge.id === judgeId);

    category.removeJudge(judge);

    await this.categoryRepository.save(category);
  }

  async reassignJudgeCategory(
    judgeId: string,
    formCategoryId: string,
    toCategoryId: string,
  ): Promise<void> {
    const formCategory = await this.categoryRepository.findOne(formCategoryId);
    const toCategory = await this.categoryRepository.findOne(toCategoryId);

    const judge = formCategory.judges.find((judge) => judge.id === judgeId);

    formCategory.removeJudge(judge);
    toCategory.assignJudge(judge);

    await this.categoryRepository.save([formCategory, toCategory]);
  }

  async uploadDevpostCsv(file: Express.Multer.File): Promise<void> {
    const csvString = file.buffer.toString();

    const projects = devpostParser(csvString, {
      titleColumn: this.configService.get(ENV.DEVPOST_TITLE_COLUMN),
      urlColumn: this.configService.get(ENV.DEVPOST_URL_COLUMN),
      categoryColumn: this.configService.get(ENV.DEVPOST_CATEGORY_COLUMN),
    });

    await this.submitProjects(projects);
  }

  async disqualifyProject(id: string, reason: string): Promise<void> {
    const project = await this.projectRepository.findOne(id);
    project.disqualify(reason);
    await this.projectRepository.save(project);
  }

  async requalifyProject(id: string): Promise<void> {
    const project = await this.projectRepository.findOne(id);
    project.requalify();
    await this.projectRepository.save(project);
  }

  async createJudgingGroups(): Promise<void> {
    const categories = await this.categoryRepository.find({
      relations: [`judges`, `submissions`],
    });

    categories.forEach((category) => {
      category.createGroups();
    });

    await this.categoryRepository.save(categories);
  }

  async scoreSubmissions(): Promise<void> {
    const categories = await this.categoryRepository.find({
      relations: [`groups`, `group.judges`, `group.submissions`],
    });

    const indeterminateJudge = categories
      .flatMap((category) => category.groups)
      .flatMap((group) => group.judges)
      .findIndex((judge) => !judge.isFinal);

    if (indeterminateJudge !== -1) {
      throw new Error(`Judge still deciding`);
    }

    categories.forEach((category) => {
      category.scoreSubmissions();
    });

    await this.categoryRepository.save(categories);
  }

  async rankSubmissions(
    categoryId: string,
    judgeId: string,
    rankings: Array<string>,
  ): Promise<void> {
    const category = await this.categoryRepository.findOne(categoryId, {
      relations: [`judges`, `judges.group`, `judges.group.submissions`],
    });

    const judge = category.judges.find((judge) => judge.id === judgeId);

    const group = judge.group;

    const submissions = rankings.map((submissionId) => {
      const submission = group.submissions.find(
        ({ id }) => id === submissionId,
      );

      if (!submission) {
        throw new Error(`Submission not found`);
      }

      return submission;
    });

    judge.rankSubmissions(submissions);

    await this.categoryRepository.save(category);
  }

  async finalizeRanking(categoryId: string, judgeId: string): Promise<void> {
    const category = await this.categoryRepository.findOneOrFail(categoryId, {
      relations: [`judges`, `judges.group`, `judges.group.submissions`],
    });
    const projects = await this.projectRepository.find();

    const judge = category.judges.find((judge) => judge.id === judgeId);
    const submissions = judge.group.submissions;

    RankingGuard(judge, submissions, projects, Judge.RANK_TO_SCORE.length);

    judge.finalizeRanking();

    await this.categoryRepository.save(category);
  }
}

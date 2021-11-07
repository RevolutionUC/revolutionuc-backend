import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from 'src/judging/infrastructure/Environment';
import { CategoryRepository } from 'src/judging/infrastructure/Repositories/Category.repository';
import { ProjectRepository } from 'src/judging/infrastructure/Repositories/Project.repository';
import { AuthService } from 'src/judging/infrastructure/Services/Auth.service';
import { EmailService } from 'src/judging/infrastructure/Services/Email.service';
import { devpostParser } from '../../../util';
import { Category } from '../../domain/category/category.entity';
import { Judge } from '../../domain/entities/judge/judge.entity';
import { Project } from '../../domain/entities/project/project.entity';
import { SubmissionService } from '../../domain/services/submission.service';
import { CategoryDto } from '../dtos/category.dto';
import { JudgeDto } from '../dtos/judge.dto';
import { ProjectDto } from '../dtos/project.dto';
import { RankingGuard } from './Ranking.guard';

@Injectable()
export class CommandHandler {
  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(ProjectRepository)
    private readonly projectRepository: ProjectRepository,
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,

    private readonly emailService: EmailService,
    private readonly authService: AuthService,

    private readonly submissionService: SubmissionService,
  ) {}

  async submitProjects(projectsData: Array<ProjectDto>): Promise<void> {
    const categories = await this.categoryRepository.findAll();

    const projects = projectsData.map((projectData) => {
      const project = Project.create(projectData);

      const optInCategories = categories.filter((category) =>
        projectData.categories.includes(category.name),
      );

      this.submissionService.submitToMandatoryCategories(project, categories);
      this.submissionService.submitToOptionalCategories(
        project,
        optInCategories,
      );

      return project;
    });

    await this.projectRepository.saveAll(projects);
    await this.categoryRepository.saveAll(categories);
  }

  async createCategory(categoryData: CategoryDto): Promise<void> {
    const existingCategory = await this.categoryRepository.findByName(
      categoryData.name,
    );

    if (existingCategory) {
      throw new Error('Category already exists');
    }

    const category = Category.create(categoryData);

    await this.categoryRepository.save(category);
  }

  async registerJudge(dto: JudgeDto): Promise<void> {
    const JUDGE_PASSWORD = this.configService.get(`JUDGE_PASSWORD`);
    const category = await this.categoryRepository.findById(dto.category);

    const judge = Judge.create(dto.name, dto.email);

    category.assignJudge(judge);

    const savedJudge = await this.categoryRepository.save(category);

    await this.authService.register({
      username: dto.email,
      password: JUDGE_PASSWORD,
      role: `JUDGE`,
      scope: savedJudge.id,
    });
  }

  async removeJudge(categoryId: string, judgeId: string): Promise<void> {
    const category = await this.categoryRepository.findById(categoryId);

    const judge = category.judges.find((judge) => judge.id === judgeId);

    category.removeJudge(judge);

    await this.categoryRepository.save(category);

    await this.authService.unregister({ username: judge.email });
  }

  async reassignJudge(
    judgeId: string,
    formCategoryId: string,
    toCategoryId: string,
  ): Promise<void> {
    const formCategory = await this.categoryRepository.findById(formCategoryId);
    const toCategory = await this.categoryRepository.findById(toCategoryId);

    const judge = formCategory.judges.find((judge) => judge.id === judgeId);

    formCategory.removeJudge(judge);
    toCategory.assignJudge(judge);

    await this.categoryRepository.saveAll([formCategory, toCategory]);
  }

  async uploadDevpostCsv(file: Express.Multer.File): Promise<void> {
    const csvString = file.buffer.toString();

    const projects = devpostParser(csvString, {
      titleColumn: this.configService.get(`DEVPOST_TITLE_COLUMN`),
      urlColumn: this.configService.get(`DEVPOST_URL_COLUMN`),
      categoryColumn: this.configService.get(`DEVPOST_CATEGORY_COLUMN`),
    });

    await this.submitProjects(projects);
  }

  async disqualifyProject(id: string, reason: string): Promise<void> {
    const project = await this.projectRepository.findById(id);
    project.disqualify(reason);
    await this.projectRepository.save(project);
  }

  async requalifyProject(id: string): Promise<void> {
    const project = await this.projectRepository.findById(id);
    project.requalify();
    await this.projectRepository.save(project);
  }

  async createJudgingGroups(): Promise<void> {
    const categories = await this.categoryRepository.findAll();

    categories.forEach((category) => {
      category.createGroups();
    });

    await this.categoryRepository.saveAll(categories);
  }

  async scoreSubmissions(): Promise<void> {
    const categories = await this.categoryRepository.findAll();

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

    await this.categoryRepository.saveAll(categories);
  }

  async rankSubmissions(
    categoryId: string,
    judgeId: string,
    rankings: Array<string>,
  ): Promise<void> {
    const category = await this.categoryRepository.findById(categoryId);

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
    const category = await this.categoryRepository.findById(categoryId);
    const projects = await this.projectRepository.findAll();

    const judges = category.groups.flatMap((group) => {
      return group.judges.map((judge) => {
        judge.group = group;
        return judge;
      });
    });

    const judge = judges.find((judge) => judge.id === judgeId);
    const submissions = judge.group.submissions;

    RankingGuard(judge, submissions, projects, Judge.RANK_TO_SCORE.length);

    judge.finalizeRanking();

    await this.categoryRepository.save(category);
  }
}

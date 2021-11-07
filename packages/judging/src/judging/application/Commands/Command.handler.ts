import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from 'src/judging/infrastructure/Environment';
import { AuthService } from 'src/judging/infrastructure/Services/Auth.service';
import { Connection, In, Repository } from 'typeorm';
import { Category } from '../../domain/entities/category/category.entity';
import { Judge } from '../../domain/entities/judge/judge.entity';
import { Project } from '../../domain/entities/project/project.entity';
import { Submission } from '../../domain/entities/submission/submission.entity';
import { AssignmentService, ScoringService } from '../../domain/services';
import { SubmissionService } from '../../domain/services/submission.service';
import { CategoryDto } from '../dtos/category.dto';
import { JudgeDto } from '../dtos/judge.dto';
import { ProjectDto } from '../dtos/project.dto';
import { RankingGuard } from './Ranking.guard';

@Injectable()
export class CommandHandler {
  constructor(
    private readonly configService: ConfigService,

    // persistence
    private connection: Connection,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Judge)
    private readonly judgeRepository: Repository<Judge>,
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,

    // external services
    private readonly authService: AuthService,

    // domain services
    private readonly submissionService: SubmissionService,
    private readonly assignmentService: AssignmentService,
    private readonly scoringService: ScoringService,
  ) {}

  async submitProjects(projectsData: Array<ProjectDto>): Promise<void> {
    const categories = await this.categoryRepository.find();

    const data = projectsData.map((projectData) => {
      const [project, submissions] = this.submissionService.submitProject(
        projectData,
        categories,
      );

      return { project, submissions };
    });

    const projects = data.map((projectData) => projectData.project);
    const submissions = data.flatMap((projectData) => projectData.submissions);

    this.connection.transaction(async (manager) => {
      await manager.save(projects);
      await manager.save(submissions);
    });
  }

  async createCategory(categoryData: CategoryDto): Promise<void> {
    const existingCategory = await this.categoryRepository.findOne({
      name: categoryData.name,
    });

    if (existingCategory) {
      throw new Error('Category already exists');
    }

    const category = Category.create(categoryData);

    await this.categoryRepository.save(category);
  }

  async registerJudge(dto: JudgeDto): Promise<void> {
    const JUDGE_PASSWORD = this.configService.get(`JUDGE_PASSWORD`);
    const category = await this.categoryRepository.findOne(dto.category);

    if (!category) {
      throw new Error('Category does not exist');
    }

    const judge = Judge.create(dto.name, dto.email);

    judge.assignToCategory(category);

    const savedJudge = await this.judgeRepository.save(judge);

    await this.authService.register({
      username: dto.email,
      password: JUDGE_PASSWORD,
      role: `JUDGE`,
      scope: savedJudge.id,
    });
  }

  async removeJudge(judgeId: string): Promise<void> {
    const judge = await this.judgeRepository.findOne(judgeId);

    if (!judge) {
      throw new Error('Judge does not exist');
    }

    await this.judgeRepository.delete(judgeId);

    await this.authService.unregister({ username: judge.email });
  }

  async reassignJudge(judgeId: string, newCategoryId: string): Promise<void> {
    const judge = await this.judgeRepository.findOne(judgeId);
    const newCategory = await this.categoryRepository.findOne(newCategoryId);

    if (!judge) {
      throw new Error('Judge does not exist');
    }

    if (!newCategory) {
      throw new Error('Category does not exist');
    }

    judge.assignToCategory(newCategory);

    await this.judgeRepository.save(judge);
  }

  async disqualifyProject(id: string, reason: string): Promise<void> {
    const project = await this.projectRepository.findOne(id);

    if (!project) {
      throw new Error('Project does not exist');
    }

    project.disqualify(reason);
    await this.projectRepository.save(project);
  }

  async requalifyProject(id: string): Promise<void> {
    const project = await this.projectRepository.findOne(id);

    if (!project) {
      throw new Error('Project does not exist');
    }

    project.requalify();
    await this.projectRepository.save(project);
  }

  async createJudgingGroups(): Promise<void> {
    const categories = await this.categoryRepository.find();
    const submissions = await this.submissionRepository.find();
    const judges = await this.judgeRepository.find();

    const [groups, updatedCategories, updatedSubmissions, updatedJudges] =
      this.assignmentService.createGroups(categories, submissions, judges);

    this.connection.transaction(async (manager) => {
      await manager.save(groups);
      await manager.save(updatedCategories);
      await manager.save(updatedSubmissions);
      await manager.save(updatedJudges);
    });
  }

  async scoreSubmissions(): Promise<void> {
    const submissions = await this.submissionRepository.find();
    const judges = await this.judgeRepository.find();

    const scoredSubmissions = this.scoringService.scoreSubmissions(
      submissions,
      judges,
    );

    await this.submissionRepository.save(scoredSubmissions);
  }

  async rankSubmissions(judgeId: string, rankings: string[]): Promise<void> {
    const judge = await this.judgeRepository.findOne(judgeId);

    if (!judge) {
      throw new Error('Judge does not exist');
    }

    const submissions = await this.submissionRepository.find({
      where: { id: In(rankings) },
    });

    judge.rankSubmissions(submissions);

    await this.judgeRepository.save(judge);
  }

  async finalizeRanking(judgeId: string): Promise<void> {
    const judge = await this.judgeRepository.findOne(judgeId);

    if (!judge) {
      throw new Error('Judge does not exist');
    }

    const submissions = await this.submissionRepository.find({
      where: { judge: judgeId },
    });

    const projects = await this.projectRepository.find({
      where: { id: In(submissions.map((submission) => submission.projectId)) },
    });

    RankingGuard(
      judge,
      submissions,
      projects,
      ScoringService.RANK_TO_SCORE.length,
    );

    judge.finalizeRanking();

    await this.judgeRepository.save(judge);
  }
}

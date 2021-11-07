import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Judge } from '../../domain/entities/judge/judge.entity';
import { Submission } from '../../domain/entities/submission/submission.entity';
import { Project } from '../../domain/entities/project/project.entity';
import { Category } from '../../domain/entities/category/category.entity';
import { Group } from '../../domain/entities/group/group.entity';

@Injectable()
export class QueryHandler {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Judge)
    private readonly judgeRepository: Repository<Judge>,
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async categories(): Promise<Array<Category>> {
    return this.categoryRepository.find();
  }

  async judges(): Promise<Array<Judge>> {
    return this.judgeRepository.find({ relations: [`category`] });
  }

  async projects(): Promise<Array<Project>> {
    return this.projectRepository.find({
      relations: [`submissions`, `submissions.category`],
    });
  }

  async groups(): Promise<Array<Group>> {
    return this.groupRepository.find({
      relations: [`judges`, `category`],
    });
  }

  async scoredSubmissions(): Promise<Array<Submission>> {
    const judge = await this.judgeRepository.findOne({ isFinal: false });

    if (judge) {
      throw new Error(`Judge ${judge.name} still deciding`);
    }

    const scoredSubmissions = await this.submissionRepository.find({
      where: { score: MoreThan(0) },
      relations: [`project`, `category`],
    });

    if (!scoredSubmissions.length) {
      throw new Error(`Scoring not started`);
    }

    return scoredSubmissions;
  }

  async judge(judgeId: string): Promise<Judge> {
    const judge = await this.judgeRepository.findOne(judgeId, {
      relations: [
        `category`,
        `group`,
        `group.submissions`,
        `group.submissions.project`,
      ],
    });

    if (!judge) {
      throw new Error(`Judge not found`);
    }

    return judge;
  }

  async submissionsForJudge(judgeId: string): Promise<Array<Submission>> {
    const judge = await this.judgeRepository.findOne(judgeId);

    if (!judge) {
      throw new Error(`Judge not found`);
    }

    const submissions = await this.submissionRepository
      .createQueryBuilder(`submission`)
      .leftJoinAndSelect(`submission.project`, `project`)
      .where(`:groupId = any (groups)`, { groupId: judge.groupId })
      .getMany();

    return submissions;
  }
}

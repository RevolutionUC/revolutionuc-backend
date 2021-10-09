import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Category } from '../../domain/aggregates/category/category.entity';
import { Group } from '../../domain/aggregates/category/group.entity';
import { Judge } from '../../domain/aggregates/category/judge.entity';
import { Submission } from '../../domain/aggregates/category/submission.entity';
import { Project } from '../../domain/aggregates/project/project.entity';

@Injectable()
export class QueryService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Judge)
    private readonly judgeRepository: Repository<Judge>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
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
      relations: [`submissions`, `submissions.project`, `judges`, `category`],
    });
  }

  async scoredSubmissions(): Promise<Array<Submission>> {
    const judge = await this.judgeRepository.findOne({ isFinal: false });

    if (judge) {
      throw new HttpException(`Judge still deciding`, HttpStatus.BAD_REQUEST);
    }

    const scoredSubmissions = await this.submissionRepository.find({
      where: { score: MoreThan(0) },
      relations: [`project`, `category`],
    });

    if (!scoredSubmissions.length) {
      throw new HttpException(`Scoring not started`, HttpStatus.NOT_FOUND);
    }

    return scoredSubmissions;
  }

  async judge(judgeId: string): Promise<Judge> {
    return this.judgeRepository.findOneOrFail(judgeId, {
      relations: [
        `category`,
        `group`,
        `group.submissions`,
        `group.submissions.project`,
      ],
    });
  }

  async getSubmissions(judgeId: string): Promise<Array<Submission>> {
    const judge = await this.judgeRepository.findOneOrFail(judgeId, {
      relations: [`group`, `group.submissions`],
    });
    return judge.group.submissions;
  }
}

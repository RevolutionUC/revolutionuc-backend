import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, MoreThan } from 'typeorm';
import { Category } from '../../domain/category/category.entity';
import { Group } from '../../domain/group/group.entity';
import { Judge } from '../../domain/entities/judge/judge.entity';
import { Submission } from '../../domain/entities/submission/submission.entity';
import { Project } from '../../domain/entities/project/project.entity';

@Injectable()
export class QueryHandler {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async categories(): Promise<Array<Category>> {
    return this.entityManager.find(Category);
  }

  async judges(): Promise<Array<Judge>> {
    return this.entityManager.find(Judge, { relations: [`category`] });
  }

  async projects(): Promise<Array<Project>> {
    return this.entityManager.find(Project);
  }

  async groups(): Promise<Array<Group>> {
    return this.entityManager.find(Group, {
      relations: [`submissions`, `submissions.project`, `judges`, `category`],
    });
  }

  async scoredSubmissions(): Promise<Array<Submission>> {
    const judge = await this.entityManager.findOne(Judge, { isFinal: false });

    if (judge) {
      throw new HttpException(`Judge still deciding`, HttpStatus.BAD_REQUEST);
    }

    const scoredSubmissions = await this.entityManager.find(Submission, {
      where: { score: MoreThan(0) },
    });

    if (!scoredSubmissions.length) {
      throw new HttpException(`Scoring not started`, HttpStatus.NOT_FOUND);
    }

    return scoredSubmissions;
  }

  async judge(judgeId: string): Promise<Judge> {
    return this.entityManager.findOne(Judge, judgeId, {
      relations: [
        `category`,
        `group`,
        `group.submissions`,
        `group.submissions.project`,
      ],
    });
  }

  async getSubmissions(judgeId: string): Promise<Array<Submission>> {
    const judge = await this.entityManager.findOneOrFail(Judge, judgeId, {
      relations: [`group`, `group.submissions`],
    });
    return judge.group.submissions;
  }
}

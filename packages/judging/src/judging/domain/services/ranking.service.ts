import { Injectable } from '@nestjs/common';
import { ScoringService } from './scoring.service';
import { Judge } from '../entities/judge/judge.entity';
import { Project } from '../entities/project/project.entity';
import {
  Submission,
  SubmissionId,
} from '../entities/submission/submission.entity';

const RANKING_LIMIT = ScoringService.RANK_TO_SCORE.length;

@Injectable()
export class RankingService {
  private rankingTooLongGuard = (judge: Judge, limit: number) => {
    if (judge.rankings.length > limit) {
      throw new Error(`Please only rank your top ${limit}`);
    }
  };

  private rankingTooShortGuard = (judge: Judge, limit: number) => {
    if (judge.rankings.length < limit) {
      throw new Error(`Please rank at-least ${limit} projects`);
    }
  };

  private rankingLengthGuard = (
    judge: Judge,
    submissions: Submission[],
    limit: number,
  ) => {
    if (submissions.length < limit) {
      limit = submissions.length;
    }

    this.rankingTooLongGuard(judge, limit);
    this.rankingTooShortGuard(judge, limit);
  };

  private disqualifiedProjectGuard = (project: Project) => {
    if (!project) {
      throw new Error(`Project not found`);
    }

    if (project.disqualified) {
      throw new Error(
        `One or more of your ranked projects have been disqualified, please refresh the page`,
      );
    }
  };

  private submissionAndProjectExistGuard = (
    submissionId: SubmissionId,
    submissions: Submission[],
    projects: Project[],
  ) => {
    const submission = submissions.find(({ id }) => id === submissionId);

    if (!submission) {
      throw new Error(`Submission not found`);
    }

    const project = projects.find(({ id }) => id === submission.projectId);

    if (!project) {
      throw new Error(`Project not found`);
    }

    return project;
  };

  finalizeJudgeRanking(
    judge: Judge,
    submissions: Submission[],
    projects: Project[],
  ): Judge {
    this.rankingLengthGuard(judge, submissions, RANKING_LIMIT);

    judge.rankings.forEach((submissionId) => {
      const project = this.submissionAndProjectExistGuard(
        submissionId,
        submissions,
        projects,
      );

      this.disqualifiedProjectGuard(project);
    });

    judge.finalizeRanking();

    return judge;
  }
}

import { Judge } from 'src/judging/domain/entities/judge/judge.entity';
import { Submission } from 'src/judging/domain/entities/submission/submission.entity';
import { Project } from 'src/judging/domain/entities/project/project.entity';

const RankingTooLongGuard = (judge: Judge, limit: number) => {
  if (judge.rankings.length > limit) {
    throw new Error(`Please only rank your top ${limit}`);
  }
};

const RankingTooShortGuard = (judge: Judge, limit: number) => {
  if (judge.rankings.length < limit) {
    throw new Error(`Please rank at-least ${limit} projects`);
  }
};

const RankingLengthGuard = (
  judge: Judge,
  submissionsToGroup: Submission[],
  limit: number,
) => {
  RankingTooLongGuard(judge, limit);

  if (submissionsToGroup.length < limit) {
    RankingTooShortGuard(judge, submissionsToGroup.length);
  } else {
    RankingTooShortGuard(judge, limit);
  }
};

const DisqualifiedProjectGuard = (project: Project) => {
  if (!project) {
    throw new Error(`Project not found`);
  }

  if (project.disqualified) {
    throw new Error(
      `One or more of your ranked projects have been disqualified, please refresh the page`,
    );
  }
};

export const RankingGuard = (
  judge: Judge,
  submissionsToGroup: Submission[],
  projects: Project[],
  rankingLimit: number,
) => {
  RankingLengthGuard(judge, submissionsToGroup, rankingLimit);

  judge.rankings.forEach((submissionId) => {
    const submission = submissionsToGroup.find(({ id }) => id === submissionId);

    const project = projects.find(({ id }) => id === submission.projectId);

    DisqualifiedProjectGuard(project);
  });
};

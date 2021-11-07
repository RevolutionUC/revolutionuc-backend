import { Injectable } from '@nestjs/common';
import { Judge } from '../entities/judge/judge.entity';
import { Submission } from '../entities/submission/submission.entity';

@Injectable()
export class ScoringService {
  static RANK_TO_SCORE = [5, 4, 3, 2, 1];

  private scoreSubmissionForRank(submission: Submission, rank: number) {
    const score = ScoringService.RANK_TO_SCORE[rank];
    submission.addScore(score);
  }

  private scoreJudgeRankings(judge: Judge, submissions: Submission[]) {
    judge.rankings.forEach((ranking, rank) => {
      const rankedSubmission = submissions.find(
        (submission) => submission.id === ranking,
      );

      if (!rankedSubmission) {
        throw new Error(
          `Could not find submission with id ${ranking} for judge ${judge.id}`,
        );
      }

      this.scoreSubmissionForRank(rankedSubmission, rank);
    });
  }

  scoreSubmissions(submissions: Submission[], judges: Judge[]) {
    const indeterminateJudge = judges.some((judge) => !judge.isFinal);

    if (indeterminateJudge) {
      throw new Error('All Judges must finalize rankings');
    }

    judges.forEach((judge) => this.scoreJudgeRankings(judge, submissions));
  }
}

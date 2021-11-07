import { Submission } from '../../entities/submission/submission.entity';
import {
  getCategory,
  getGroup,
  getJudge,
  getProject,
} from '../../entities/__mocks__';
import { ScoringService } from '../scoring.service';

const submissionsKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const judgeKeys = [
  [1, 2, 3, 4, 5],
  [1, 3, 5, 7, 9],
];

const expectedScores = [0, 10, 4, 7, 2, 4, 0, 2, 0, 1, 0];

describe(`ScoringService`, () => {
  const category = getCategory();
  const group = getGroup(category);

  const submissions = submissionsKeys.map(() => {
    const submission = Submission.create(category, getProject());
    submission.assignToGroup(group);
    return submission;
  });

  const judges = judgeKeys.map((ranking) => {
    const judge = getJudge();
    judge.assignToCategory(category);
    judge.assignToGroup(group);

    const rankedSubmissions = ranking.map((rank) => submissions[rank]);
    judge.rankSubmissions(rankedSubmissions);
    return judge;
  });

  const scoringService = new ScoringService();

  it(`should throw error if a judge is not finalized`, () => {
    expect(() => {
      scoringService.scoreSubmissions(submissions, judges);
    }).toThrow();
  });

  it(`should score submissions`, () => {
    judges.forEach((judge) => judge.finalizeRanking());

    scoringService.scoreSubmissions(submissions, judges);

    const scores = submissions.map((submission) => submission.score);
    console.log(JSON.stringify({ submissions, scores }));
    expect(scores).toEqual(expectedScores);
  });
});

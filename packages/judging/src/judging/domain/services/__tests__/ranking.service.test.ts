import * as faker from 'faker';
import { RankingService } from '..';
import { Submission } from '../../entities/submission/submission.entity';
import {
  getCategory,
  getJudgeWithGroup,
  getProject,
} from '../../entities/__mocks__';

describe(`RankingService`, () => {
  const rankingService = new RankingService();

  describe(`on more than 5 submissions to the category`, () => {
    const category = getCategory();
    const projects = faker.datatype.array(10).map(() => getProject());

    const [judge, group] = getJudgeWithGroup({ category });
    judge.assignToGroup(group);

    const submissions = projects.map((project) => {
      const submission = Submission.create(category, project);
      submission.assignToGroup(group);
      return submission;
    });

    beforeEach(() => {
      judge.isFinal = false;
    });

    it(`succeeds on 5 ranked submissions`, () => {
      judge.rankSubmissions([...submissions].splice(0, 5));

      const finalizedJudge = rankingService.finalizeJudgeRanking(
        judge,
        submissions,
        projects,
      );

      expect(finalizedJudge.rankings).toHaveLength(5);
      expect(finalizedJudge.isFinal).toBe(true);
    });

    it(`throws error if less than 5 ranked submissions`, () => {
      judge.rankSubmissions([...submissions].splice(0, 4));

      expect(() =>
        rankingService.finalizeJudgeRanking(judge, submissions, projects),
      ).toThrow();
    });

    it(`throws error if more than 5 ranked submissions`, () => {
      judge.rankSubmissions([...submissions].splice(0, 6));

      expect(() =>
        rankingService.finalizeJudgeRanking(judge, submissions, projects),
      ).toThrow();
    });

    it(`throws error if a ranked project is disqualified`, () => {
      judge.rankSubmissions([...submissions].splice(0, 5));

      projects[0].disqualify(`test`);

      expect(() =>
        rankingService.finalizeJudgeRanking(judge, submissions, projects),
      ).toThrow();
    });
  });

  describe(`on less than 5 submissions to the category`, () => {
    const category = getCategory();
    const projects = faker.datatype.array(4).map(() => getProject());

    const [judge, group] = getJudgeWithGroup({ category: category });
    judge.assignToGroup(group);

    const submissions = projects.map((project) => {
      const submission = Submission.create(category, project);
      submission.assignToGroup(group);
      return submission;
    });

    beforeEach(() => {
      judge.isFinal = false;
    });

    it(`succeeds if submissions assigned to group are less than 5`, () => {
      judge.rankSubmissions(submissions);

      const finalizedJudge = rankingService.finalizeJudgeRanking(
        judge,
        submissions,
        projects,
      );

      expect(finalizedJudge.rankings).toHaveLength(4);
      expect(finalizedJudge.isFinal).toBe(true);
    });

    it(`throws error if less ranked submissions than total`, () => {
      judge.rankSubmissions([...submissions].splice(0, 3));

      expect(() =>
        rankingService.finalizeJudgeRanking(judge, submissions, projects),
      ).toThrow();
    });

    it(`throws error if (somehow) more ranked submissions than total`, () => {
      const extraSubmissions = Submission.create(category, getProject());
      extraSubmissions.assignToGroup(group);

      judge.rankSubmissions([...submissions, extraSubmissions]);

      expect(() =>
        rankingService.finalizeJudgeRanking(judge, submissions, projects),
      ).toThrow();
    });

    it(`throws error if a ranked project is disqualified`, () => {
      judge.rankSubmissions(submissions);

      projects[0].disqualify(`test`);

      expect(() =>
        rankingService.finalizeJudgeRanking(judge, submissions, projects),
      ).toThrow();
    });
  });
});

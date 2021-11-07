import * as faker from 'faker';
import {
  getCategory,
  getGroup,
  getJudge,
  getJudgeWithGroup,
  getJudgeWithSubmissions,
  getSubmissionsWithGroup,
} from '../../__mocks__';
import { Judge } from '../judge.entity';

describe(`Judge`, () => {
  describe(`create`, () => {
    it(`returns an instance of the Judge model`, () => {
      const judgeDto = {
        name: faker.name.findName(),
        email: faker.internet.email(),
      };

      const judge = Judge.create(judgeDto.name, judgeDto.email);

      expect(judge).toBeInstanceOf(Judge);
    });

    it(`returns object with the correct properties`, () => {
      const judgeDto = {
        name: faker.name.findName(),
        email: faker.internet.email(),
      };

      const judge = Judge.create(judgeDto.name, judgeDto.email);

      expect(judge.name).toBe(judgeDto.name);
      expect(judge.email).toBe(judgeDto.email);
    });
  });

  describe(`assignToCategory`, () => {
    it(`assigns judge to category`, () => {
      const category = getCategory();
      const judge = getJudge();

      judge.assignToCategory(category);

      expect(judge.categoryId).toBe(category.id);
    });

    it(`throws an error if group is already assigned`, () => {
      const [judge, group] = getJudgeWithGroup();
      judge.assignToGroup(group);
      const category = getCategory();

      expect(() => judge.assignToCategory(category)).toThrow();
    });
  });

  describe(`assignToGroup`, () => {
    it(`assigns judge to group in the category`, () => {
      const [judge, group] = getJudgeWithGroup();

      judge.assignToGroup(group);

      expect(judge.groupId).toBe(group.id);
    });

    it(`throws an error is judge is not assigned a category`, () => {
      const judge = getJudge();
      const group = getGroup(getCategory());

      expect(() => judge.assignToGroup(group)).toThrow();
    });

    it(`throws an error if group is of another category`, () => {
      const [judge] = getJudgeWithGroup();

      const group = getGroup(getCategory());

      expect(() => judge.assignToGroup(group)).toThrow();
    });
  });

  describe(`rankSubmissions`, () => {
    it(`ranks submissions in the group`, () => {
      const [judge, submissions] = getJudgeWithSubmissions(
        faker.datatype.number(10),
      );
      const submissionIds = submissions.map((submission) => submission.id);

      judge.rankSubmissions(submissions);

      expect(judge.rankings).toEqual(submissionIds);
    });

    it(`throws error if a submission is not in group`, () => {
      const [judge] = getJudgeWithGroup();
      const [submissions] = getSubmissionsWithGroup(faker.datatype.number(10));

      expect(() => judge.rankSubmissions(submissions)).toThrow();
    });

    it(`throws error if judge has finalized ranking`, () => {
      const [judge, submissions] = getJudgeWithSubmissions(
        faker.datatype.number(10),
      );

      judge.finalizeRanking();

      expect(() => judge.rankSubmissions(submissions)).toThrow();
    });
  });

  describe(`finalizeRanking`, () => {
    it(`finalizes ranking`, () => {
      const [judge, submissions] = getJudgeWithSubmissions(
        faker.datatype.number(10),
      );
      judge.rankSubmissions(submissions);

      judge.finalizeRanking();

      expect(judge.isFinal).toBe(true);
    });
  });
});

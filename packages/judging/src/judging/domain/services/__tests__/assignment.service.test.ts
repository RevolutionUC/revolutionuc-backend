import { Category } from '../../entities/category/category.entity';
import { Judge } from '../../entities/judge/judge.entity';
import { Submission } from '../../entities/submission/submission.entity';
import {
  getJudgeWithGroup,
  getSubmissionsWithCategory,
} from '../../entities/__mocks__';
import { AssignmentService } from '../assignment.service';

const testCases = [
  {
    judgesPerGroup: 2,
    groupsPerSubmission: 3,

    judgesCreating: 7,
    submissionsCreating: 11,

    expectedGroups: 4,
    expectedJudgesPerGroup: [2, 1],
    expectedSubmissionsPerGroup: [9, 6],
  },
  {
    judgesPerGroup: 1,
    groupsPerSubmission: 2,

    judgesCreating: 3,
    submissionsCreating: 8,

    expectedGroups: 3,
    expectedJudgesPerGroup: [1],
    expectedSubmissionsPerGroup: [6, 4],
  },
];

describe(`AssignmentService`, () => {
  const data = testCases.map<[Category, Judge[], Submission[]]>(
    (testCase, index) => {
      const category = Category.create({
        name: `Category ${index}`,
        groupsPerSubmission: testCase.groupsPerSubmission,
        judgesPerGroup: testCase.judgesPerGroup,
      });

      const judges: Judge[] = [];

      for (let i = 0; i < testCase.judgesCreating; i++) {
        judges.push(getJudgeWithGroup({ category })[0]);
      }

      const [submissions] = getSubmissionsWithCategory(
        testCase.submissionsCreating,
        {
          category,
        },
      );

      return [category, judges, submissions];
    },
  );

  const assignmentService = new AssignmentService();

  const categories = data.map((d) => d[0]);
  const judges = data.flatMap((d) => d[1]);
  const submissions = data.flatMap((d) => d[2]);

  const [groups] = assignmentService.createGroups(
    categories,
    submissions,
    judges,
  );

  const categoryGroups = categories.map((category) =>
    groups.filter((group) => group.categoryId === category.id),
  );

  testCases.forEach((testCase, index) => {
    describe(`category ${index}`, () => {
      describe(`groups`, () => {
        it(`should have ${testCase.expectedGroups} groups`, () => {
          expect(categoryGroups[index].length).toBe(testCase.expectedGroups);
        });

        it(`should have ${testCase.expectedJudgesPerGroup.join(
          ` or `,
        )} judges`, () => {
          categoryGroups[index].forEach((group) => {
            const groupJudges = judges.filter(
              (judge) => judge.groupId === group.id,
            );

            expectOr(
              testCase.expectedJudgesPerGroup.map(
                (attempt) => () => expect(groupJudges.length).toBe(attempt),
              ),
            );
          });
        });

        it(`should have ${testCase.expectedSubmissionsPerGroup.join(
          ` or `,
        )} submissions`, () => {
          categoryGroups[index].forEach((group) => {
            const groupSubmissions = submissions.filter((submission) =>
              submission.groups?.includes(group.id),
            );

            expectOr(
              testCase.expectedSubmissionsPerGroup.map(
                (attempt) => () =>
                  expect(groupSubmissions.length).toBe(attempt),
              ),
            );
          });
        });
      });

      describe(`submissions`, () => {
        it(`should be assigned to ${testCase.groupsPerSubmission} groups`, () => {
          const submissions = data[index][2];
          const testCase = testCases[index];
          const groups = categoryGroups[index];

          submissions.forEach((submission) => {
            const groupsForThisSubmission = groups.filter((group) =>
              submission.groups?.includes(group.id),
            );

            expect(groupsForThisSubmission.length).toBe(
              testCase.groupsPerSubmission,
            );
          });
        });
      });
    });
  });
});

function expectOr(tests: Array<() => void>) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    tests.shift()!();
  } catch (e) {
    if (tests.length) expectOr(tests);
    else throw e;
  }
}

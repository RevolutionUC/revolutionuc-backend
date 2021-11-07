import * as faker from 'faker';
import { ProjectDto } from '../../../application/dtos/project.dto';
import { getCategory } from '../../entities/__mocks__';
import { SubmissionService } from '../submission.service';

const MANDATORY_CATEGORIES = 5;
const OPTIONAL_CATEGORIES = 10;

describe(`AssignmentService`, () => {
  const mandatoryCategories = faker.datatype
    .array(getNumberUnder(MANDATORY_CATEGORIES))
    .map(() => getCategory({ mandatory: true }));

  const optionalCategories = faker.datatype
    .array(OPTIONAL_CATEGORIES)
    .map(() => getCategory({ mandatory: false }));

  const projectData = getProjectData();

  const randomOptionalCategoriesIndex = faker.datatype
    .array(getNumberUnder(optionalCategories.length - 1))
    .map(() => getNumberUnder(optionalCategories.length - 1));

  const randomOptionalCategories = Array.from(
    new Set(randomOptionalCategoriesIndex),
  ).map((index) => optionalCategories[index]);

  projectData.categories = randomOptionalCategories.map(
    (category) => category.name,
  );

  const categories = [...mandatoryCategories, ...randomOptionalCategories];

  const submissionService = new SubmissionService();

  const [project, submissions] = submissionService.submitProject(
    projectData,
    categories,
  );

  const expectedSubmissions =
    mandatoryCategories.length + randomOptionalCategories.length;

  describe(`project`, () => {
    it(`should return a project`, () => {
      expect(project).toBeDefined();
    });
  });

  describe(`submissions`, () => {
    it(`should return expected number of submissions`, () => {
      expect(submissions.length).toBe(expectedSubmissions);
    });

    describe(`mandatory`, () => {
      it(`should return submissions for each mandatory category`, () => {
        mandatoryCategories.forEach((category) => {
          const submission = submissions.find(
            (submission) => submission.categoryId === category.id,
          );

          expect(submission).toBeDefined();
        });
      });
    });
    describe(`optional`, () => {
      it(`should return submissions for each opt-in category`, () => {
        randomOptionalCategories.forEach((category) => {
          const submission = submissions.find(
            (submission) => submission.categoryId === category.id,
          );

          expect(submission).toBeDefined();
        });
      });

      it(`should not return for optional categories not opted in`, () => {
        const nonOptedInCategories = optionalCategories.filter(
          (category) =>
            !randomOptionalCategories.some((optInCategory) => {
              return optInCategory.id === category.id;
            }),
        );

        nonOptedInCategories.forEach((category) => {
          const submission = submissions.find(
            (submission) => submission.categoryId === category.id,
          );

          expect(submission).toBeUndefined();
        });
      });
    });
  });
});

function getProjectData(): ProjectDto {
  return {
    title: faker.random.word(),
    submitter: faker.random.word(),
    url: faker.internet.url(),
    team: [faker.random.word(), faker.random.word()],
    categories: [],
  };
}

function getNumberUnder(max: number): number {
  return faker.datatype.number({ min: 1, max });
}

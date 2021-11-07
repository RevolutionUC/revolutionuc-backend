import { Category } from '../../category/category.entity';
import { Project } from '../../project/project.entity';
import { getCategory, getGroup, getProject } from '../../__mocks__';
import { Submission } from '../submission.entity';

describe(`Submission`, () => {
  describe(`create`, () => {
    const category: Category = getCategory();
    const project: Project = getProject();

    it(`returns an instance of Submission model`, () => {
      const submission = Submission.create(category, project);

      expect(submission).toBeInstanceOf(Submission);
    });

    it(`returns object with the correct properties`, () => {
      const submission = Submission.create(category, project);

      expect(submission.categoryId).toBe(category.id);
      expect(submission.projectId).toBe(project.id);
    });
  });

  describe(`assignToGroup`, () => {
    it(`assigns group to submission`, () => {
      const project = getProject();
      const category = getCategory();
      const group = getGroup(category);

      const submission = Submission.create(category, project);

      submission.assignToGroup(group);

      expect(submission.groups).toContain(group.id);
    });

    it(`assigns multiple groups to submission`, () => {
      const project = getProject();
      const category = getCategory();
      const group1 = getGroup(category);
      const group2 = getGroup(category);

      const submission = Submission.create(category, project);

      submission.assignToGroup(group1);
      submission.assignToGroup(group2);

      expect(submission.groups).toContain(group1.id);
      expect(submission.groups).toContain(group2.id);
    });

    it(`throws an error if group is not in the same category is submission`, () => {
      const project = getProject();
      const group = getGroup(getCategory());

      const submission = Submission.create(getCategory(), project);

      expect(() => submission.assignToGroup(group)).toThrow();
    });
  });

  describe(`addScore`, () => {
    it(`adds score to submission`, () => {
      const project = getProject();
      const category = getCategory();
      const group = getGroup(category);

      const submission = Submission.create(category, project);

      submission.assignToGroup(group);

      submission.addScore(1);

      expect(submission.score).toBe(1);
    });

    it(`adds score multiple times`, () => {
      const project = getProject();
      const category = getCategory();
      const group = getGroup(category);

      const submission = Submission.create(category, project);

      submission.assignToGroup(group);

      submission.addScore(1);
      submission.addScore(2);

      expect(submission.score).toBe(3);
    });
  });
});

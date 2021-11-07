import * as faker from 'faker';
import { CategoryDto } from '../../../application/dtos/category.dto';
import { ProjectDto } from '../../../application/dtos/project.dto';
import { Category } from '../category/category.entity';
import { Group } from '../group/group.entity';
import { Judge } from '../judge/judge.entity';
import { Project } from '../project/project.entity';
import { Submission } from '../submission/submission.entity';

interface Seeds {
  judge?: Judge;
  category?: Category;
  group?: Group;
}

export const getProject = (data?: Partial<ProjectDto>): Project => {
  return Project.create({
    title: data?.title || faker.random.word(),
    submitter: data?.submitter || faker.random.word(),
    url: data?.url || faker.internet.url(),
    team: data?.team || [faker.random.word(), faker.random.word()],
    categories: data?.categories || [faker.random.word(), faker.random.word()],
  });
};

export const getCategory = (data?: Partial<CategoryDto>): Category => {
  return Category.create({
    name: data?.name || faker.random.word(),
    groupsPerSubmission: data?.groupsPerSubmission || faker.datatype.number(),
    judgesPerGroup: data?.judgesPerGroup || faker.datatype.number(),
    mandatory:
      data?.mandatory === undefined ? faker.datatype.boolean() : data.mandatory,
  });
};

export const getJudge = (data?: { name?: string; email?: string }): Judge => {
  return Judge.create(
    data?.name || faker.name.findName(),
    data?.email || faker.internet.email(),
  );
};

export const getGroup = (category: Category, name?: string): Group => {
  return Group.create(name || faker.random.word(), category);
};

export const getJudgeWithGroup = (seed?: Seeds): [Judge, Group, Category] => {
  const judge = seed?.judge || getJudge();
  const category = seed?.category || getCategory();
  const group = seed?.group || Group.create(faker.random.word(), category);

  judge.assignToCategory(category);

  return [judge, group, category];
};

export const getJudgeWithSubmissions = (
  submissionsLength: number,
  seed?: Seeds,
): [Judge, Submission[]] => {
  const [judge, group, category] = getJudgeWithGroup(seed);

  judge.assignToGroup(group);

  const submissions = faker.datatype.array(submissionsLength).map(() => {
    const submission = Submission.create(category, getProject());
    submission.assignToGroup(group);
    return submission;
  });

  return [judge, submissions];
};

export const getSubmissionsWithCategory = (
  submissionsLength: number,
  seed?: Seeds,
): [Submission[], Category] => {
  const category = seed?.category || getCategory();
  const submissions = faker.datatype
    .array(submissionsLength)
    .map(() => Submission.create(category, getProject()));

  return [submissions, category];
};

export const getSubmissionsWithGroup = (
  submissionsLength: number,
  seed?: Seeds,
): [Submission[], Group] => {
  const [submissions, category] = getSubmissionsWithCategory(
    submissionsLength,
    seed,
  );
  const group = seed?.group || getGroup(category);

  submissions.forEach((submission) => submission.assignToGroup(group));

  return [submissions, group];
};

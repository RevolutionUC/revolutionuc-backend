import * as faker from 'faker';
import { ProjectDto } from 'src/judging/application/dtos/project.dto';
import { getProject } from '../../__mocks__';
import { Project } from '../project.entity';

describe(`Project`, () => {
  const disqualificationReason = faker.random.word();

  describe(`create`, () => {
    const projectDto: ProjectDto = {
      title: faker.random.word(),
      submitter: faker.random.word(),
      url: faker.internet.url(),
      team: [faker.random.word(), faker.random.word()],
      categories: [faker.random.word(), faker.random.word()],
    };

    it(`returns an instance of Project model`, () => {
      const project = Project.create(projectDto);

      expect(project).toBeInstanceOf(Project);
    });

    it(`return object with the correct properties`, () => {
      const project = Project.create(projectDto);

      expect(project.title).toBe(projectDto.title);
      expect(project.submitter).toBe(projectDto.submitter);
      expect(project.url).toBe(projectDto.url);
      expect(project.team).toEqual(projectDto.team);
    });
  });

  describe(`disqualify`, () => {
    it(`disqualifies project`, () => {
      const project = getProject();

      project.disqualify(disqualificationReason);

      expect(project.disqualified).toBe(disqualificationReason);
    });

    it(`throws error if reason is not provided`, () => {
      const project = getProject();

      expect(() => project.disqualify('')).toThrow();
    });

    it(`throws error if already disqualified`, () => {
      const project = getProject();

      project.disqualify(disqualificationReason);

      expect(() => project.disqualify(disqualificationReason)).toThrow();
    });
  });

  describe(`requalify`, () => {
    it(`requalifies disqualified project`, () => {
      const project = getProject();

      project.disqualify(disqualificationReason);
      project.requalify();

      expect(project.disqualified).toBe(undefined);
    });

    it(`throws error if project is not disqualified`, () => {
      const project = getProject();

      expect(() => project.requalify()).toThrow();
    });
  });
});

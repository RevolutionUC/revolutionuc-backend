import { Injectable } from '@nestjs/common';
import { ProjectDto } from 'src/judging/application/dtos/project.dto';
import { Category } from '../entities/category/category.entity';
import { Project } from '../entities/project/project.entity';
import { Submission } from '../entities/submission/submission.entity';

@Injectable()
export class SubmissionService {
  private submitToCategories(
    project: Project,
    categories: Category[],
  ): Submission[] {
    return categories.map((category) => Submission.create(category, project));
  }

  submitProject(
    projectDto: ProjectDto,
    categories: Category[],
  ): [Project, Submission[]] {
    const mandatoryCategories = categories.filter(
      (category) => category.mandatory,
    );

    const optInCategories = categories.filter(
      (category) =>
        !category.mandatory && projectDto.categories.includes(category.name),
    );

    const project = Project.create(projectDto);

    const submissions = [
      ...this.submitToCategories(project, optInCategories),
      ...this.submitToCategories(project, mandatoryCategories),
    ];

    return [project, submissions];
  }
}

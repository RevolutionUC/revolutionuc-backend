import { Injectable } from '@nestjs/common';
import { ProjectDto } from 'src/judging/dtos/project.dto';
import { Category } from '../aggregates/category/category.entity';
import { Project } from '../aggregates/project/project.entity';

@Injectable()
export class SubmissionService {
  submitProject(projectData: ProjectDto, allCategories: Category[]): Project {
    const mandatoryCategories = allCategories.filter(
      (category) => category.mandatory,
    );

    const project = Project.create(projectData);

    mandatoryCategories.forEach((category) => {
      category.submitProject(project);
    });

    allCategories
      .filter((category) => projectData.categories.includes(category.name))
      .forEach((category) => {
        category.submitProject(project);
      });

    return project;
  }
}

import { Injectable } from '@nestjs/common';
import { Category } from '../category/category.entity';
import { Project } from '../project/project.entity';

@Injectable()
export class SubmissionService {
  submitToMandatoryCategories(project: Project, allCategories: Category[]) {
    const mandatoryCategories = allCategories.filter(
      (category) => category.mandatory,
    );

    mandatoryCategories.forEach((category) => category.submitProject(project));
  }

  submitToOptionalCategories(project: Project, optInCategories: Category[]) {
    optInCategories.forEach((category) => {
      category.submitProject(project);
    });
  }
}

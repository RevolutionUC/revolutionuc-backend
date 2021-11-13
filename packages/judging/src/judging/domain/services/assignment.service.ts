import { Injectable } from '@nestjs/common';
import { groupNameGenerator } from '../../../util';
import { Category } from '../entities/category/category.entity';
import { Group } from '../entities/group/group.entity';
import { Judge } from '../entities/judge/judge.entity';
import { Submission } from '../entities/submission/submission.entity';

@Injectable()
export class AssignmentService {
  private assignJudgesToGroup(
    category: Category,
    groups: Group[],
    judges: Judge[],
  ) {
    const maximumJudges = category.judgesPerGroup;

    let assignedJudges: Judge[] = [];

    // Start assignment with the first group again
    let groupIndex = 0;

    // Go through the list of judges
    judges.forEach((judge) => {
      if (assignedJudges.length === maximumJudges) {
        // Next group
        groupIndex++;
        assignedJudges = [];
      }

      const group = groups[groupIndex];

      judge.assignToGroup(group);
      assignedJudges.push(judge);
    });
  }

  private assignSubmissionsToGroup(
    category: Category,
    groups: Group[],
    submissions: Submission[],
  ) {
    const submissionCount = submissions.length;
    const totalSubmissions = submissionCount * category.groupsPerSubmission;
    const maximumSubmissions = Math.ceil(totalSubmissions / groups.length);

    let assignedSubmissions: Submission[] = [];

    // Start assignment with the first group again
    let groupIndex = 0;

    // each submission can be judges multiple times
    for (let i = 0; i < category.groupsPerSubmission; i++) {
      // Go through the list of submissions
      submissions.forEach((submission) => {
        if (assignedSubmissions.length === maximumSubmissions) {
          // Next group
          groupIndex++;
          assignedSubmissions = [];
        }

        const group = groups[groupIndex];

        submission.assignToGroup(group);
        assignedSubmissions.push(submission);
      });
    }
  }

  private createGroupsForCategory(
    category: Category,
    submissions: Submission[],
    judges: Judge[],
    groupCount: number,
  ) {
    const groupNames = groupNameGenerator(groupCount);

    const groups = groupNames.map((name) => {
      return Group.create(name, category);
    });

    this.assignJudgesToGroup(category, groups, judges);
    this.assignSubmissionsToGroup(category, groups, submissions);

    return groups;
  }

  createGroups(
    categories: Category[],
    submissions: Submission[],
    judges: Judge[],
  ): [Group[], Category[], Submission[], Judge[]] {
    const groups = categories.flatMap((category) => {
      const categorySubmissions = submissions.filter(
        (submission) => submission.categoryId === category.id,
      );
      const categoryJudges = judges.filter(
        (judge) => judge.categoryId === category.id,
      );

      const groupCount = Math.ceil(
        categoryJudges.length / category.judgesPerGroup,
      );

      return this.createGroupsForCategory(
        category,
        categorySubmissions,
        categoryJudges,
        groupCount,
      );
    });

    return [groups, categories, submissions, judges];
  }
}

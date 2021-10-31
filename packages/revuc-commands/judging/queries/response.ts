import { CategoryDTO, GroupDTO, JudgeDTO, ProjectDTO, SubmissionDTO } from "judging/dtos";
import { Queries } from ".";

export interface Response {
  [Queries.CATEGORIES]: {
    categories: CategoryDTO[];
  }
  [Queries.JUDGES]: {
    judges: JudgeDTO[];
  }
  [Queries.PROJECTS]: {
    projects: ProjectDTO[];
  }
  [Queries.GROUPS]: {
    groups: GroupDTO[];
  }
  [Queries.SCORED_SUBMISSIONS]: {
    submissions: SubmissionDTO[];
  }
  [Queries.JUDGE]: {
    judge: JudgeDTO;
  }
  [Queries.GET_SUBMISSIONS]: {
    submissions: SubmissionDTO[];
  }
}
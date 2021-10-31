import {
  CategoryDTO,
  GroupDTO,
  JudgeDTO,
  ProjectDTO,
  SubmissionDTO,
} from 'judging/dtos';
import { Tokens } from '.';

export interface Response {
  [Tokens.CATEGORIES]: {
    categories: CategoryDTO[];
  };
  [Tokens.JUDGES]: {
    judges: JudgeDTO[];
  };
  [Tokens.PROJECTS]: {
    projects: ProjectDTO[];
  };
  [Tokens.GROUPS]: {
    groups: GroupDTO[];
  };
  [Tokens.SCORED_SUBMISSIONS]: {
    submissions: SubmissionDTO[];
  };
  [Tokens.JUDGE]: {
    judge: JudgeDTO;
  };
  [Tokens.GET_SUBMISSIONS]: {
    submissions: SubmissionDTO[];
  };
}

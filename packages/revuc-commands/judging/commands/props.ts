import {Commands} from '.'

export interface Props {
  [Commands.SUBMIT_PROJECTS]: {
    title: string;
    url: string;
    submitter: string;
    team: string[];
    categories: string[];
  }[]

  [Commands.CREATE_CATEGORY]: {
    name: string;
    groupCount: number;
    groupsPerSubmission: number;
    mandatory?: boolean;
  }

  [Commands.REGISTER_JUDGE]: {
    name: string;
    email: string;
    category?: string;
  }

  [Commands.REMOVE_JUDGE]: {
    categoryId: string;
    judgeId: string
  }

  [Commands.REASSIGN_JUDGE]: {
    judgeId: string;
    formCategoryId: string;
    toCategoryId: string;
  }

  [Commands.DISQUALIFY_PROJECT]: {
    projectId: string;
    reason: string;
  }

  [Commands.REQUALIFY_PROJECT]: {
    projectId: string;
  }

  [Commands.CREATE_JUDGING_GROUPS]: void

  [Commands.SCORE_SUBMISSIONS]: void

  [Commands.RANK_SUBMISSIONS]: {
    categoryId: string,
    judgeId: string,
    rankings: string[],
  }

  [Commands.FINALIZE_RANKING]: {
    categoryId: string;
    judgeId: string;
  }
}
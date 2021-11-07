import { Tokens } from '.';

export interface Props {
  [Tokens.SUBMIT_PROJECTS]: {
    title: string;
    url: string;
    submitter: string;
    team: string[];
    categories: string[];
  }[];

  [Tokens.CREATE_CATEGORY]: {
    name: string;
    groupsPerSubmission: number;
    judgesPerGroup: number;
    mandatory?: boolean;
  };

  [Tokens.REGISTER_JUDGE]: {
    name: string;
    email: string;
    category?: string;
  };

  [Tokens.REMOVE_JUDGE]: {
    categoryId: string;
    judgeId: string;
  };

  [Tokens.REASSIGN_JUDGE]: {
    judgeId: string;
    formCategoryId: string;
    toCategoryId: string;
  };

  [Tokens.DISQUALIFY_PROJECT]: {
    projectId: string;
    reason: string;
  };

  [Tokens.REQUALIFY_PROJECT]: {
    projectId: string;
  };

  [Tokens.CREATE_JUDGING_GROUPS]: void;

  [Tokens.SCORE_SUBMISSIONS]: void;

  [Tokens.RANK_SUBMISSIONS]: {
    categoryId: string;
    judgeId: string;
    rankings: string[];
  };

  [Tokens.FINALIZE_RANKING]: {
    categoryId: string;
    judgeId: string;
  };
}

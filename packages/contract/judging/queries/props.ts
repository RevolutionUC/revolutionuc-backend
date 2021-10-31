import { Tokens } from '.';

export interface Props {
  [Tokens.JUDGE]: {
    judgeId: string;
  };

  [Tokens.GET_SUBMISSIONS]: {
    judgeId: string;
  };
}

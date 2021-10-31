import { Queries } from '.';

export interface Props {
  [Queries.JUDGE]: {
    judgeId: string;
  };

  [Queries.GET_SUBMISSIONS]: {
    judgeId: string;
  };
}

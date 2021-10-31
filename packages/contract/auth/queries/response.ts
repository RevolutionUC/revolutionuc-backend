import { Tokens } from '.';

export interface Response {
  [Tokens.LOGIN]: {
    token: string;
  };

  [Tokens.PASWORD_RESET]: {
    token: string;
  };
}

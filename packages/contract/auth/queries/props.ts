import { Tokens } from '.';

export interface Props {
  [Tokens.LOGIN]: {
    username: string;
    password: string;
  };

  [Tokens.CHECK_PERMISSION]: {
    token: string;
    role: string;
    scope: string;
  };

  [Tokens.PASWORD_RESET]: {
    username: string;
  };
}

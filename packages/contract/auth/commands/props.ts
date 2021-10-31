import { Tokens } from '.';

export interface Props {
  [Tokens.CREATE_USER]: {
    username: string;
    password: string;
    role: string;
    scope: string;
  };

  [Tokens.REMOVE_USER]: {
    username: string;
  };

  [Tokens.CHANGE_PASSWORD]: {
    token: string;
    password: string;
  };
}

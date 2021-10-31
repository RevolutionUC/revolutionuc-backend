import { ChangePasswordHandler } from './change-password.handler';
import { CreateUserHandler } from './create-user.handler';
import { RemoveUserHandler } from './remove-user.handler';

export const CommandHandlers = [
  ChangePasswordHandler,
  CreateUserHandler,
  RemoveUserHandler,
];

import { CheckPermissionHandler } from './check-permission.handler';
import { LoginHandler } from './login.handler';
import { PasswordResetHandler } from './password-reset.handler';

export const QueryHandlers = [
  CheckPermissionHandler,
  LoginHandler,
  PasswordResetHandler,
];

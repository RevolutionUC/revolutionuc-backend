import { REGISTRATION } from '.';

export interface RegistrationEmails {
  [REGISTRATION.CONFIRM_ATTENDANCE]: {
    subject: string;
    body: string;
  };
}

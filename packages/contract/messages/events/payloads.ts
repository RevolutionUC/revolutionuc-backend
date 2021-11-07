import { EVENTS } from '.';

export interface Payloads {
  [EVENTS.ATTENDANCE_CONFIRMED]: {
    name: string;
    email: string;
    // attendance data
  };

  [EVENTS.ATTENDANCE_REJECTED]: {
    email: string;
  };

  [EVENTS.USER_CREATED]: {
    username: string;
    password: string;
    role: string;
    scope: string;
  };

  [EVENTS.USER_REMOVED]: {
    username: string;
  };
}

import { AttendeeDTO } from '../dtos';

// create attendee
export class CreateAttendee {
  static NAME = 'create-attendee';

  constructor(public readonly data: AttendeeDTO) {}
}

// update attendee
export class UpdateAttendee {
  static NAME = 'update-attendee';

  constructor(
    public readonly attendeeId: string,
    public readonly data: AttendeeDTO,
  ) {}
}

// check in attendee
export class CheckInAttendee {
  static NAME = 'check-in-attendee';

  constructor(
    public readonly attendeeId: string,
    public readonly discordId?: string,
  ) {}
}

// create event
// update event
// attend event

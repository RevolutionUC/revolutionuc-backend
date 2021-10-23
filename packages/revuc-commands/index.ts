import { ICommand, IEvent, IQuery } from './core';

export namespace Registration {
  namespace Commands {
    // register
    export interface Register<D> extends ICommand<D> {
      name: 'register';
    }

    // verify email
    export interface VerifyEmail<D> extends ICommand<D> {
      name: 'verifyEmail';
    }

    // confirm attendance
    export interface ConfirmAttendance<D> extends ICommand<D> {
      name: 'confirmAttendance';
    }

    // update registration
    export interface UpdateRegistration<D> extends ICommand<D> {
      name: 'updateRegistration';
    }
  }

  namespace Events {
    // registration created
    export interface RegistrationCreated<D> extends IEvent<D> {
      name: 'registrationCreated';
    }

    // registration verified
    export interface RegistrationVerified<D> extends IEvent<D> {
      name: 'registrationVerified';
    }

    // attendance confirmed
    export interface AttendanceConfirmed<D> extends IEvent<D> {
      name: 'attendanceConfirmed';
    }

    // registration updated
    export interface RegistrationUpdated<D> extends IEvent<D> {
      name: 'registrationUpdated';
    }
  }
  
  namespace Queries {
    // registrations
    export interface Registrations<D> extends IQuery<D> {
      name: 'registrations';
    }

    // registration
    export interface Registration<D> extends IQuery<D> {
      name: 'registration';
    }
  }
}

export namespace Attendance {
  namespace Commands {
    // create attendee
    // update attendee
    // check in attendee
    // create event
    // update event
    // attend event
  }

  namespace Events {
    // attendee created
    // attendee updated
    // attendee checked in
    // event created
    // event updated
    // attendee attended event
  }

  namespace Queries {
    // attendees
    // attendance
    // events
  }
}

export namespace Lattice {
  namespace Commands {
    // create hacker
    // update hacker profile
    // set hacker visibility
    // create skill
    // swipe on profile
    // reset negative swipes
    // send notification
    // read notification
    // subscribe to notifications
    // unsubscribe from notifications
  }

  namespace Events {
    // swiped
    // matched
  }

  namespace Queries {
    // hacker profile
    // scored profiles
    // skills
    // notifications
  }
}

export namespace Judging {
  namespace Commands {
    // create category
    // remove category
    // add judge
    // remove judge
    // reassign judge
    // add projects
    // disqualify project
    // reqalify project
    // assign groups
    // rank submissions
    // finalize rankings
    // score submissions
  }

  namespace Events {
    // category created
    // category removed
    // judge added
    // judge removed
    // judge reassigned
    // projects added
    // project disqualified
    // project requalified
    // groups assigned
    // submissions ranked
    // rankings finalized
    // submissions scored
  }

  namespace Queries {
    // categories
    // judges
    // projects
    // groups
    // group submissions
    // rankings
    // 
  }
}

import { system } from "../systems";

const registrationService = system.addContainer(
  'Registration Service',
  'Microservice for registration',
  'NestJS'
)!;

const registrationDatabase = system.addContainer(
  'Registration Database',
  'Database for the Registration microservice',
  'PostgreSQL'
)!;

registrationService.uses(registrationDatabase, `persists data`)!;
export const registrationMS = { service: registrationService, database: registrationDatabase };

const attendeeService = system.addContainer(
  'Attendee Service',
  'Microservice for the attendee functionality',
  'NestJS'
)!;

const attendeeDatabase = system.addContainer(
  'Attendee Database',
  'Database for the Attendee microservice',
  'PostgreSQL'
)!;

attendeeService.uses(attendeeDatabase, `persists data`)!;
export const attendeeMS = { service: attendeeService, database: attendeeDatabase };

const latticeService = system.addContainer(
  'Lattice Service',
  'Microservice for hacker matching',
  'NestJS'
)!;

const latticeDatabase = system.addContainer(
  'Lattice Database',
  'Database for the Lattice microservice',
  'PostgreSQL'
)!;

latticeService.uses(latticeDatabase, `persists data`)!;
export const latticeMS = { service: latticeService, database: latticeDatabase };

const judgingService = system.addContainer(
  'Judging Service',
  'Microservice for submissions, judging and scoring',
  'NestJS'
)!;

const judgingDatabase = system.addContainer(
  'Judging Database',
  'Database for the Judging microservice',
  'PostgreSQL'
)!;

judgingService.uses(judgingDatabase, `persists data`)!;
export const judgingMS = { service: judgingService, database: judgingDatabase };

const authService = system.addContainer(
  'Auth Service',
  'Microservice for authenticating requests to the system',
  'NestJS'
)!;

const authDatabase = system.addContainer(
  'Auth Database',
  'Database for the Auth microservice',
  'PostgreSQL'
)!;

authService.uses(authDatabase, `persists data`)!;
export const authMS = { service: authService, database: authDatabase };
  
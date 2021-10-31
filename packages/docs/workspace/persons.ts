import { workspace } from "./workspace";

export const organizer = workspace.model.addPerson('Organizer', 'administers the system and manages users')!;
export const registrant = workspace.model.addPerson('Registrant', 'registers for the hackathon')!;
export const sponsor = workspace.model.addPerson('Sponsor', 'sponsors the event and runs sponsor booths')!;
export const judge = workspace.model.addPerson('Judge', 'judges the submissions')!;
export const mentor = workspace.model.addPerson('Mentor', 'mentors participants')!;
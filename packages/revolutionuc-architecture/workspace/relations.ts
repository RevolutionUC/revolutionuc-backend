import { website, devWebsite, admin, emails, judging, stats, assets, lattice, api, revvit } from "./containers";
import { organizer, registrant, judge } from "./persons";
import { system, discord, mailgun } from "./systems";

registrant.uses(website, 'registers');
registrant.uses(system, 'registers using and gets information');
registrant.uses(discord, 'communicates using');
registrant.uses(lattice, 'finds potential teammates');
registrant.uses(mailgun, 'receives emails');
registrant.uses(revvit, 'check in using');

judge.uses(system, 'judges using');
judge.uses(discord, 'communicates using');
judge.uses(judging, 'ranks submissions assigned to them');
judge.uses(mailgun, 'receives emails');
judge.uses(revvit, 'check in using');

organizer.uses(system, 'manages');
organizer.uses(discord, 'manages');
organizer.uses(devWebsite, 'stages new features');
organizer.uses(admin, 'manages registrants');
organizer.uses(emails, 'designs emails');
organizer.uses(judging, 'manages submission, judging and prizing data');
organizer.uses(stats, 'monitors statistics');
organizer.uses(assets, 'manages files');
organizer.uses(revvit, 'manage attendees using');

website.uses(api, 'new registrations', 'HTTP');
website.uses(assets, 'fetches images', 'HTTP');

devWebsite.uses(api, 'new registrations', 'HTTP');

admin.uses(api, 'for all functionality', 'HTTP');

judging.uses(api, 'for all functionality', 'HTTP');

stats.uses(api, 'fetches live data', 'HTTP');

lattice.uses(api, 'for all functionality', 'HTTP');
lattice.uses(assets, 'fetches images', 'HTTP');

revvit.uses(api, 'checks in attendees', 'HTTP');
revvit.uses(discord, 'receives commands', 'HTTP');

emails.uses(mailgun, 'sends emails', 'HTTP');

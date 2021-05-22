import { website, devWebsite, admin, emails, judging, stats, assets, lattice, api, database, revvit } from "./containers";
import { organizer, registrant, judge } from "./persons";
import { system, discord } from "./systems";

organizer.uses(system, 'manages');
registrant.uses(system, 'registers using and gets information');
judge.uses(system, 'judges using');

organizer.uses(discord, 'manages');
registrant.uses(discord, 'communicates using');
judge.uses(discord, 'communicates using');

organizer.uses(devWebsite, 'stages new features');
organizer.uses(admin, 'manages registrants');
organizer.uses(emails, 'designs emails');
organizer.uses(judging, 'manages submission, judging and prizing data');
organizer.uses(stats, 'monitors statistics');
organizer.uses(assets, 'manages files');

registrant.uses(website, 'registers');
registrant.uses(lattice, 'finds potential teammates');

judge.uses(judging, 'ranks submissions assigned to them');

website.uses(api, 'new registrations', 'HTTP');
website.uses(assets, 'fetches images', 'HTTP');
devWebsite.uses(api, 'new registrations', 'HTTP');
admin.uses(api, 'for all functionality', 'HTTP');
judging.uses(api, 'for all functionality', 'HTTP');
api.uses(emails, 'sends automated emails', 'Javascript import');
api.uses(database, 'stores all the data', 'PG');
api.uses(assets, 'store uploaded resumes', 'HTTP');
stats.uses(database, 'fetches live data', 'PG');
lattice.uses(api, 'for all functionality', 'HTTP');
lattice.uses(assets, 'fetches images', 'HTTP');
revvit.uses(api, 'checks in attendees', 'HTTP');
revvit.uses(database, 'storing attendee information', 'PG');
revvit.uses(discord, 'receives commands', 'HTTP');


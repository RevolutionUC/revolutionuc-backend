import { workspace } from "../workspace";
import { registrant, organizer, judge } from "../persons";
import { system, discord, mailgun } from "../systems";
import { admin, api, devWebsite, judging, lattice, stats, website } from "../containers";

export const frontendView = workspace.views.createContainerView(
  system,
  'system-frontend',
  'Container view for the RevolutionUC system'
);
frontendView.addSoftwareSystem(discord);
frontendView.addSoftwareSystem(mailgun);
frontendView.addPerson(registrant);
frontendView.addPerson(organizer);
frontendView.addPerson(judge);
frontendView.addContainer(website);
frontendView.addContainer(devWebsite);
frontendView.addContainer(admin);
frontendView.addContainer(stats);
frontendView.addContainer(lattice);
frontendView.addContainer(judging);
frontendView.addContainer(devWebsite);
frontendView.addContainer(api);
frontendView.addNearestNeighbours(system);
frontendView.setAutomaticLayout(true);

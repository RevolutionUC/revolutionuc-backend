import { workspace } from "../workspace";
import { registrant } from "../persons";
import { system, discord, mailgun } from "../systems";
import { api, assets, database, emails, lattice, revvit, website } from "../containers";

export const registrantView = workspace.views.createContainerView(
  system,
  'registrant-view',
  'Container view for the interaction of registrants with the RevolutionUC system'
);

registrantView.addSoftwareSystem(discord);
registrantView.addSoftwareSystem(mailgun);
registrantView.addContainer(website);
registrantView.addContainer(assets);
registrantView.addContainer(lattice);
registrantView.addContainer(api);
registrantView.addContainer(database);
registrantView.addContainer(emails);
registrantView.addContainer(revvit);
registrantView.addPerson(registrant);
registrantView.setAutomaticLayout(true);
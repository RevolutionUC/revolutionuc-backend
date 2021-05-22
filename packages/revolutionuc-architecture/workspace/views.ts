import { workspace } from "./workspace";
import { registrant, organizer, judge } from "./persons";
import { system, discord } from "./systems";
import { lattice, website } from "./containers";

export const systemContext = workspace.views.createSystemContextView(
  system,
  'system-context',
  'The system context view for the RevolutionUC system'
);
systemContext.addNearestNeighbours(system);
systemContext.addNearestNeighbours(discord);
systemContext.addAllPeople();
systemContext.setAutomaticLayout(true);

export const allContainerView = workspace.views.createContainerView(
  system,
  'system-containers',
  'Container view for the RevolutionUC system'
);
allContainerView.addSoftwareSystem(discord);
allContainerView.addAllContainers();
allContainerView.addPerson(registrant);
allContainerView.addPerson(organizer);
allContainerView.addPerson(judge);
allContainerView.addNearestNeighbours(system);
allContainerView.setAutomaticLayout(true);

export const registrantView = workspace.views.createContainerView(
  system,
  'registrant-view',
  'Container view for the interaction of registrants with the RevolutionUC system'
);
registrantView.addSoftwareSystem(discord);
registrantView.addContainer(website);
registrantView.addContainer(lattice);
registrantView.addPerson(registrant);
// registrantView.addNearestNeighbours(system);
registrantView.setAutomaticLayout(true);
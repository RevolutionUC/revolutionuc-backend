import { workspace } from "../workspace";
import { registrant, organizer, judge } from "../persons";
import { system, discord, mailgun } from "../systems";

export const allContainerView = workspace.views.createContainerView(
  system,
  'system-containers',
  'Container view for the RevolutionUC system'
);
allContainerView.addSoftwareSystem(discord);
allContainerView.addSoftwareSystem(mailgun);
allContainerView.addAllContainers();
allContainerView.addPerson(registrant);
allContainerView.addPerson(organizer);
allContainerView.addPerson(judge);
allContainerView.addNearestNeighbours(system);
allContainerView.setAutomaticLayout(true);

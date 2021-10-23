import { workspace } from "../workspace";
import { organizer } from "../persons";
import { system } from "../systems";
import { api } from "../containers";

export const organizerView = workspace.views.createContainerView(
  system,
  'organizer-view',
  'Container view for the interaction of organizers with the RevolutionUC system'
);

organizerView.addPerson(organizer);
organizerView.addNearestNeighbours(organizer);
organizerView.addContainer(api);
organizerView.setAutomaticLayout(true);
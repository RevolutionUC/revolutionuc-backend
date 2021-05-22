import { workspace } from "../workspace";
import { organizer } from "../persons";
import { system, discord } from "../systems";
import { admin, api, assets, database, judging, revvit } from "../containers";

export const organizerView = workspace.views.createContainerView(
  system,
  'organizer-view',
  'Container view for the interaction of organizers with the RevolutionUC system'
);

organizerView.addSoftwareSystem(discord);
organizerView.addContainer(assets);
organizerView.addContainer(admin);
organizerView.addContainer(api);
organizerView.addContainer(database);
organizerView.addContainer(revvit);
organizerView.addContainer(judging);
organizerView.addPerson(organizer);
organizerView.setAutomaticLayout(true);
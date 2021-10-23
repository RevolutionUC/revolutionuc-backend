import { workspace } from "../workspace";
import { system, discord, mailgun } from "../systems";

export const systemContextView = workspace.views.createSystemContextView(
  system,
  'system-context',
  'The system context view for the RevolutionUC system'
);
systemContextView.addNearestNeighbours(system);
systemContextView.addNearestNeighbours(discord);
systemContextView.addNearestNeighbours(mailgun);
systemContextView.addAllPeople();
systemContextView.setAutomaticLayout(true);
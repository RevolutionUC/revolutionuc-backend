import { workspace } from "../workspace";
import { judge } from "../persons";
import { system, discord, mailgun } from "../systems";
import { api, database, emails, judging, revvit } from "../containers";

export const judgeView = workspace.views.createContainerView(
  system,
  'judge-view',
  'Container view for the interaction of judges with the RevolutionUC system'
);

judgeView.addSoftwareSystem(discord);
judgeView.addSoftwareSystem(mailgun);
judgeView.addContainer(judging);
judgeView.addContainer(api);
judgeView.addContainer(database);
judgeView.addContainer(emails);
judgeView.addContainer(revvit);
judgeView.addPerson(judge);
judgeView.setAutomaticLayout(true);
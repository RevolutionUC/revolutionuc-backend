import { judgingMS } from './../containers/services';
import { workspace } from '../workspace';
import { judge } from '../persons';
import { system, discord, mailgun } from '../systems';
import { api, emails, revvit } from '../containers';

export const judgeView = workspace.views.createContainerView(
  system,
  'judge-view',
  'Container view for the interaction of judges with the RevolutionUC system',
);

judgeView.addPerson(judge);
judgeView.addNearestNeighbours(judge);
judgeView.addContainer(api);
judgeView.addContainer(emails);
judgeView.addContainer(judgingMS.service);
judgeView.setAutomaticLayout(true);

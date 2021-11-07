import { latticeMS, attendeeMS } from './../containers/services';
import { emails } from './../containers/infrastructure';
import { workspace } from '../workspace';
import { registrant } from '../persons';
import { system, discord, mailgun } from '../systems';
import { api, assets, revvit, website } from '../containers';
import { registrationMS } from '../containers/services';

export const registrantView = workspace.views.createContainerView(
  system,
  'registrant-view',
  'Container view for the interaction of registrants with the RevolutionUC system',
);

registrantView.addPerson(registrant);
registrantView.addNearestNeighbours(registrant);
registrantView.addContainer(api);
registrantView.addContainer(emails);
registrantView.addContainer(registrationMS.service);
registrantView.addContainer(latticeMS.service);
registrantView.addContainer(attendeeMS.service);
registrantView.setAutomaticLayout(true);

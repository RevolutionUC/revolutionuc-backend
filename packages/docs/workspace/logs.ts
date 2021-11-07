import { organizer } from './persons';
import { flow, mailgun, services, system, teams } from './systems';
import { workspace } from './workspace';

export const logs = system.addContainer(
  'Logs',
  'Captures webhook notifications and sends them to Flow',
  'Node and AWS Lambda',
)!;

services.uses(logs, 'sends webhook notifications', 'HTTP');
logs.uses(flow, 'sends Adaptive Cards', 'HTTP');
flow.uses(teams, 'sends Adaptive Cards to the logs channel');

organizer.uses(teams, 'communicates and collaborates using');

export const logsView = workspace.views.createContainerView(
  system,
  'logs-view',
  'Container view for the interaction of the logs',
);
// logsView.addSoftwareSystem(ms);
logsView.addSoftwareSystem(services);
logsView.addSoftwareSystem(flow);
logsView.addSoftwareSystem(teams);
logsView.addContainer(logs);
logsView.addPerson(organizer);
logsView.setAutomaticLayout(true);

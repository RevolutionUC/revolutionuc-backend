import { Location } from "structurizr-typescript";
import { organizer } from "./persons";
import { system } from "./systems";
import { workspace } from "./workspace";

export const logs = system.addContainer(
  'Logs',
  'Captures webhook notifications and sends them to Flow',
  'Node and AWS Lambda'
)!;

export const services = workspace.model.addSoftwareSystem(
  'Cloud Services',
  'Various cloud services used for hosting, deployment, management etc.',
  Location.External
)!;

export const ms = workspace.model.addSoftwareSystem(
  'Microsoft Apps',
  'Microsoft suite of applications',
  Location.External
)!;

export const flow = ms.addContainer(
  'Microsoft Flow',
  'Automated workflows provider',
  'Microsoft Flow'
)!;

export const teams = ms.addContainer(
  'Microsoft Teams',
  'Communication and collaboration platform',
  'Microsoft Teams'
)!;

services.uses(logs, 'sends webhook notifications', 'HTTP');
logs.uses(ms, 'sends Adaptive Cards', 'HTTP');
logs.uses(flow, 'sends Adaptive Cards', 'HTTP');
flow.uses(teams, 'sends Adaptive Cards to the logs channel');

organizer.uses(teams, 'communicates and collaborates using');

export const logsView = workspace.views.createContainerView(
  system,
  'logs-view',
  'Container view for the interaction of the logs'
);
// logsView.addSoftwareSystem(ms);
logsView.addSoftwareSystem(services);
logsView.addContainer(logs);
logsView.addContainer(flow);
logsView.addContainer(teams);
logsView.addPerson(organizer);
logsView.setAutomaticLayout(true);

import { Location } from 'structurizr-typescript';
import { workspace } from './workspace';

export const system = workspace.model.addSoftwareSystem(
  'RevolutionUC System',
  'Provides all the functionality for the hackathon',
  Location.Internal,
)!;

export const discord = workspace.model.addSoftwareSystem(
  'Discord',
  'Communication for the event',
  Location.External,
)!;

export const mailgun = workspace.model.addSoftwareSystem(
  'Mailgun',
  'Cloud service to send emails',
  Location.External,
)!;

export const services = workspace.model.addSoftwareSystem(
  'Cloud Services',
  'Various cloud services used for hosting, deployment, management etc.',
  Location.External,
)!;

export const flow = workspace.model.addSoftwareSystem(
  'Microsoft Flow',
  'Automated workflows provider',
  Location.External,
)!;

export const teams = workspace.model.addSoftwareSystem(
  'Microsoft Teams',
  'Communication and collaboration platform',
  Location.External,
)!;

// export const teams = workspace.model.addSoftwareSystem(
//   'Microsoft Teams',
//   'Collaboration platform for organizers',
//   Location.External
// )!;

import { Location } from "structurizr-typescript";
import { workspace } from "./workspace";

export const system = workspace.model.addSoftwareSystem(
  'RevolutionUC System',
  'Provides all the functionality for the hackathon',
  Location.Internal
)!;

export const discord = workspace.model.addSoftwareSystem(
  'Discord',
  'Communication for the event',
  Location.External
)!;

// export const teams = workspace.model.addSoftwareSystem(
//   'Microsoft Teams',
//   'Collaboration platform for organizers',
//   Location.External
// )!;

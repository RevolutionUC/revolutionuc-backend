import { workspace } from "../workspace";
import { Services, Infrastructure } from "../containers";
import { system } from "../systems";
import { organizer } from "../persons";

export const backendView = workspace.views.createContainerView(
  system,
  'system-backend',
  'Microservice interaction view for the RevolutionUC system'
);
Object.values(Services).forEach(s => {
  backendView.addContainer(s.service)
  backendView.addContainer(s.database)
});
Object.values(Infrastructure).forEach(infra => backendView.addContainer(infra));
backendView.addPerson(organizer);
backendView.setAutomaticLayout(true);

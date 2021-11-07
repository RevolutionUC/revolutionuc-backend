import { workspace } from '../workspace';
import { Services, Infrastructure } from '../containers';
import { system } from '../systems';

export const backendView = workspace.views.createContainerView(
  system,
  'system-backend',
  'Microservice interaction view for the RevolutionUC system',
);
Object.values(Services).forEach((s) => {
  backendView.addContainer(s.service);
});
Object.values(Infrastructure).forEach((infra) =>
  backendView.addContainer(infra),
);
backendView.setAutomaticLayout(true);

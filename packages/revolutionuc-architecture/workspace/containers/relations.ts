import { assets, Infrastructure, Services } from '.';

const { api, emails } = Infrastructure;

Object.entries(Services).forEach(([name, { service }]) => {
  if(name === `authService`) {
    api.uses(service, `authenticates requests using`);
  } else {
    api.uses(service, `routes request to`);
  }
  service.uses(emails, `send emails`);
});

Services.registrationMS.service.uses(assets, `stores registrant resumes`);

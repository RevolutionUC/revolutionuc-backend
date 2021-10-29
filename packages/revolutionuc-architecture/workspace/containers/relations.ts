import { assets, Infrastructure, Services } from '.';

const { api, emails, queue } = Infrastructure;

Object.entries(Services).forEach(([name, { service }]) => {
  service.uses(queue, `sends and receive messages`);
});

api.uses(queue, `sends and receive messages`);

emails.uses(queue, `sends and receive messages`);

Services.registrationMS.service.uses(assets, `stores registrant resumes`);
Services.latticeMS.service.uses(assets, `stores lattice skill logos`);

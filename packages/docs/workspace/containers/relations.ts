import { Infrastructure, Services } from '.';

const { api, emails, assets, eventQueue, emailQueue } = Infrastructure;

Object.entries(Services).forEach(([name, { service }]) => {
  if (name === `authMS`) {
    api.uses(service, `authorizes requests using`, `TCP`);
  } else {
    api.uses(service, `sends commands and queries`, `TCP`);
    service.uses(eventQueue, `emits and listens to events`, `AMQP`);
    service.uses(emailQueue, `sends commands`, `AMQP`);
  }
});

emails.uses(emailQueue, `subscribes to messages`, `AMQP`);

Services.registrationMS.service.uses(assets, `stores registrant resumes`);
Services.latticeMS.service.uses(assets, `stores lattice skill logos`);

Services.latticeMS.service.uses(
  Services.authMS.service,
  `manages users using`,
  `TCP`,
);
Services.judgingMS.service.uses(
  Services.authMS.service,
  `manages users using`,
  `TCP`,
);
